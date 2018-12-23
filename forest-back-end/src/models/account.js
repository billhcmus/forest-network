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
        this.updateAccount = this.updateAccount.bind(this);
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

    updateAccount() {
        try {  
            var pic = fs.readFileSync('./src/models/chau.jpg');

            let name = "Jarvis";
            let data = new Buffer(name.toString('utf-8'));

            let tx = {
                version: 1,
                account: '',
                sequence: 48,
                memo: Buffer.alloc(0),
                operation: 'update_account',
                params: {key: 'name', value: data},
            }
        
            sign(tx, SECRET_KEY);
            let data_encoding = '0x' + encode(tx).toString('hex');

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            return new Promise((resolve, reject) => {
                this.app.service.post('broadcast_tx_commit', querystring.stringify({tx: data_encoding}), config).then(res => {
                    console.log(res.data.result);
                    if (_.get(res.data.result, "height") === "0") {
                        let rs = {code: -1}
                        return resolve(rs);
                    } else {
                        console.log(res.data);
                        return resolve(res.data)
                    }
                }).catch(err => {
                    return reject(err);
                });
            });
        } catch(e) {
            console.log('Error:', e.stack);
        }
    }
}