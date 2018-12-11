const {Keypair} = require('stellar-base');
import {encode, sign} from '../transaction';
import {SECRET_KEY, ThongAccount} from '../config';
import WebService from '../webservice';

export default class Account {
    constructor(app) {
        this.app = app;
        this.service = new WebService();
        this.UserSayHello = this.UserSayHello.bind(this);
        this.createAccount = this.createAccount.bind(this);
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
            params: {address: key.publicKey()},
            signature: Buffer.alloc(64, 0)
        }

        sign(tx, SECRET_KEY);
        let data_encoding = '0x'+encode(tx).toString('hex');

        return new Promise((resolve, reject) => {
            this.service.get(`broadcast_tx_commit?tx=${data_encoding}`).then(res => {
                console.log(res.data);
                return resolve(key.privateKey())
            }).catch(err => {
                return reject(err);
            });
        });
    }
}