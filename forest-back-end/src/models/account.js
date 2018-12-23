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
        this.getAccount = this.getAccount.bind(this);
        this.payment = this.payment.bind(this);
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

    async payment(tx) {
        let res = await this.app.service.get(`broadcast_tx_commit?tx=${tx}`);
        if (_.get(res.data.result, "height") === "0") {
            return {code: -1}
        } else {
            return res.data
        }
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
}