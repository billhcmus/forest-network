const {Keypair} = require('stellar-base');
import {encode,sign} from '../transaction';
import {SECRET_KEY,ThongAccount} from '../config';
import _ from 'lodash';

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

    createAccount() {
        const key = Keypair.random();
        let tx = {
            version: 1,
            account: '',
            sequence: 6,
            memo: Buffer.alloc(0),
            operation: 'create_account',
            params: {
                address: key.publicKey()
            },
            signature: Buffer.alloc(64, 0)
        }

        sign(tx, SECRET_KEY);
        let data_encoding = '0x' + encode(tx).toString('hex');

        return new Promise((resolve, reject) => {
            this.app.service.get(`broadcast_tx_commit?tx=${data_encoding}`).then(res => {
                console.log(res.data);
                return resolve(key.privateKey())
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