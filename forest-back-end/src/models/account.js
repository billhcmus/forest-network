const {Keypair} = require('stellar-base');
const moment = require('moment');

import {encode,sign,verify} from '../transaction';
import {SECRET_KEY,ThongAccount} from '../config';
import _ from 'lodash';
import { Buffer } from 'safe-buffer';


const BANDWIDTH_PERIOD = 86400;
const ACCOUNT_KEY = Buffer.from('account');
const OBJECT_KEY = Buffer.from('object');
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

export default class Account {
    constructor(app) {
        this.app = app;
        this.UserSayHello = this.UserSayHello.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.getTransaction = this.getTransaction.bind(this);
        this.getAmount = this.getAmount.bind(this);
    }


    UserSayHello() {
        return new Promise((resolve, reject) => {
            resolve("Hello from User Model");
        })
    }

    async auth(publicKey) {
        let account = await this.app.db.collection('account').findOne({_id: publicKey});
        return account;
    }

    async createAccount(publicKey) {
        let account = await this.app.db.collection('account').findOne({_id: publicKey});

        let tx = {
            version: 1,
            account: '',
            sequence: account.sequence + 1,
            memo: Buffer.alloc(0),
            operation: 'create_account',
            params: {address: publicKey},
        }

        sign(tx, SECRET_KEY);
        let data_encoding = '0x' + encode(tx).toString('hex');

        return new Promise((resolve, reject) => {
            this.app.service.get(`broadcast_tx_commit?tx=${data_encoding}`).then(res => {
                console.log(res)
                if (_.get(res.data.result, "height") === "0") {
                    let rs = {code: -1}
                    return resolve(rs);
                } else {
                    return resolve(res.data)
                }
            }).catch(err => {
                return reject(err);
            });
        });
    }

    async getTransaction(publicKey) {
        let transaction = [];
        let total_count = 0;

        await this.app.service.get(`tx_search?query="account='${publicKey}'"&prove=false&page=1&per_page=100`).then(res => {
            transaction = res.data.result.txs;
            total_count = res.data.result.total_count;
        }).catch(err => {
            console.log(err);
        });

        let bound = Math.ceil(total_count / 100);
        for (let i = 2; i <= bound; ++i) {
            await this.app.service.get(`tx_search?query="account='${publicKey}'"&prove=false&page=${i}&per_page=100`).then(res => {
                transaction = transaction.concat(res.data.result.txs);
            }).catch(err => {
                console.log(err);
            });
        }
        return transaction;
    }

    async getAmount(publicKey) {
        let amount = 0;
        await this.getTransaction(publicKey).then(rs => {
            for (let i = 0; i < rs.length; ++i) {
                let data = this.app.helper.decodeTransaction(_.get(rs[i], "tx"));
                if (_.get(data, "operation") === "payment")
                    if (_.get(data, "account") === publicKey) { // chuyen tien di cho address
                        amount -= parseInt(_.get(data.params, "amount"));
                    } else {
                        amount += parseInt(_.get(data.params, "amount"));
                    }
            }
        });
        return amount;
    }

    async getSequence(publicKey) {
        let account = await this.app.db.collection('account').findOne({_id: publicKey});
        return account.sequence;
    }


    async syncTxsToDB() {
        let beginHeight = 0;
        let metaHeight = await this.app.db.collection('metadata').findOne({_id: 'finalHeight'});
        if (metaHeight)
            beginHeight = metaHeight._value;
        else
            await this.app.db.collection('metadata').insertOne({_id: 'finalHeight'});

        let status =  await this.app.service.get('status')
        let lastheight = status.data.result.sync_info.latest_block_height;
        console.log("SyncTX: ",beginHeight,"-->",lastheight);
        //Duyệt từng height
        for (let i = beginHeight + 1; i <= lastheight; ++i) {
                let res = await this.app.service.get(`block?height=${i}`)
                let txs = res.data.result.block.data.txs;
                let block_time = res.data.result.block.header.time;
                if (txs !== null) {
                    //Duyệt từng tx trong list tx của block
                    for(let j = 0; j < txs.length; j++)
                    {
                        console.log("Height", i)
                        let err = await this.executeTx(txs[j], block_time);
                        if (err)
                            console.log(err);
                    }
                }
        }
        await this.app.db.collection('metadata').findOneAndUpdate(
            {_id: 'finalHeight'},
            {$set: {_value: +lastheight}})
        return { code: 1 };
    }

    async executeTx(tx, block_time) {
        //Verify tx có hợp lệ không, theo các trường hợp trong code server.js

        const data = this.app.helper.decodeTransaction(tx)//decode từ buffer binary sang json
        const txSize = tx.length;

        // Check signature
        if (!verify(data)) {
            return 'Wrong signature';
        }

        //Get account from MongoDB
        const account = await this.app.db.collection('account').findOne({_id: data.account});

        // Check account
        if (!account) {
            return 'Account does not exists';
        }

        // Check sequence
        const nextSequence = account.sequence + 1;
        if (nextSequence !== data.sequence) {
            return('Sequence mismatch');
        }

        // Check memo
        if (data.memo.length > 32) {
            return('Memo has more than 32 bytes.');
        }

        //Check bandwidth
        const diff = account.bandwidthTime
            ? moment(block_time).unix() - moment(account.bandwidthTime).unix()
            : BANDWIDTH_PERIOD;
        const bandwidthLimit = account.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;
        // 24 hours window max 65kB
        account.bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * account.bandwidth + txSize);
        if (account.bandwidth > bandwidthLimit) {
            return('Bandwidth limit exceeded');
        }

        await this.app.db.collection('account').findOneAndUpdate(
            {_id: data.account},
            {$set: {
                    bandwidthTime: block_time,
                    sequence: nextSequence,
                    bandwidth: account.bandwidth,
                }})

        //Process operation
        let operation = _.get(data, "operation");
        if (operation === 'create_account'){
            let params = _.get(data, "params")
            let address = _.get(params, "address");

            const found = await this.app.db.collection('account').findOne({_id: address});

            if (found) {
                return('Account address existed');
            }

            const newAccount = {
                _id: address,
                sequence: 0,
                balance: 0,
                bandwidth: 0,
            }
            await this.app.db.collection('account').insertOne(newAccount);
            console.log(`${account._id} create ${address}`);

        }
        else if (operation ===  'payment') {
            let params = _.get(data, "params")
            let address = _.get(params, "address");
            let amount = _.get(params, "amount");

            const found = await this.app.db.collection('account').findOne({_id: address});
            if (!found) {
                return('Destination address does not exist');
            }
            if (address === data.account) {
                return('Cannot transfer to the same address');
            }
            if (amount <= 0) {
                return('Amount must be greater than 0');
            }
            if (amount > account.balance) {
                return('Amount must be less or equal to source balance');
            }

            //tru nguoi gui
            await this.app.db.collection('account').findOneAndUpdate(
                {_id: account._id},
                {$inc: {balance: -amount}})
            //cong nguoi nhan
            await this.app.db.collection('account').findOneAndUpdate(
                {_id: address},
                {$inc: {balance: amount}})

            console.log(`${account._id} transfered ${amount} to ${address}`);

        }
        else if (operation ===  'post') {
            let params = _.get(data, "params")
            let content = _.get(params, "content");
            let keys = _.get(params, "keys");
            console.log(`${account._id} post content ${content} keys ${keys}`);

        }
        else if (operation === 'update_account'){
            let params = _.get(data, "params")
            let key = _.get(params, "key");
            let value = _.get(params, "value");
            console.log(`${account._id} update_account key ${key} value ${value}`);

        }
        else if (operation === 'interact'){
            let params = _.get(data, "params")
            let object = _.get(params, "object");
            let content = _.get(params, "content");
            console.log(`${account._id} interact object ${object} content ${content}`);

        }
        else
            return('Operation is not support.');

    }
}