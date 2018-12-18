import {verify} from '../transaction';
import _ from 'lodash';

const moment = require('moment');

const BANDWIDTH_PERIOD = 86400;
const ACCOUNT_KEY = Buffer.from('account');
const OBJECT_KEY = Buffer.from('object');
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

export default class Synchronization {
    constructor(app) {
        this.app = app;
    }

    async syncTxsToDB() {
        let beginHeight = 0;
        let metaHeight = await this.app.db.collection('metadata').findOne({_id: 'finalHeight'});
        if (metaHeight) {
            beginHeight = metaHeight._value;
        } else {
            await this.app.db.collection('metadata').insertOne({_id: 'finalHeight'});            
        }

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
                        let err = await this.checkAndWriteToDB(txs[j], block_time);
                        if (err)
                            console.log(err);
                    }
                }
                await this.app.db.collection('metadata').findOneAndUpdate(
                    {_id: 'finalHeight'},
                    {$set: {_value: i}})

        }
        return { code: 1 };
    }

    async checkAndWriteToDB(tx, block_time) {
        //Verify tx có hợp lệ không, theo các trường hợp trong code server.js

        const txSize =  Buffer(tx, 'base64').length;
        const data = this.app.helper.decodeTransaction(tx)//decode từ buffer binary sang json

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

            const newUser = {
                _id: address,
            }
            await this.app.db.collection('user').insertOne(newUser);

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

            const newPost = {
                author:account._id,
                content: content,
                keys: keys,
            }
            await this.app.db.collection('post').insertOne(newPost);
            console.log(`${account._id} post content ${content} keys ${keys}`);

        }
        else if (operation === 'update_account'){
            let params = _.get(data, "params")
            let key = _.get(params, "key");
            let value = _.get(params, "value");
            if (key === "name")
            {
                await this.app.db.collection('user').findOneAndUpdate(
                    {_id: data.account},
                    {$set: {name: value.toString('utf-8')}})
            }
            else if (key === "picture")
            {
                await this.app.db.collection('user').findOneAndUpdate(
                    {_id: data.account},
                    {$set: {picture: value}})
            }
            else if (key === "followings")
            {
                await this.app.db.collection('user').findOneAndUpdate(
                    {_id: data.account},
                    {$set: {followings: value}})
            }
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