const {Keypair} = require('stellar-base');
const moment = require('moment');

import {encode,sign,verify} from '../transaction';
import {SECRET_KEY,ThongAccount} from '../config';
import _ from 'lodash';
import { Buffer } from 'safe-buffer';

export default class Account {
    constructor(app) {
        this.app = app;
        this.createAccount = this.createAccount.bind(this);
        this.getTransaction = this.getTransaction.bind(this);
        this.getAmount = this.getAmount.bind(this);
        this.getAccount = this.getAccount.bind(this);
    }

    async auth(publicKey) {
        let account = await this.app.db.collection('account').findOne({_id: publicKey});
        return account;
    }

    async getAccount(publicKey) {
        let account = await this.app.db.collection('account').findOne({_id: publicKey});
        return account;
    }

    async getSequence(publicKey) {
        let account = await this.app.db.collection('account').findOne({_id: publicKey});
        return account.sequence;
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
}