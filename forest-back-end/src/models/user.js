const {Keypair} = require('stellar-base');
import {encode, decode, verify, sign, hash} from '../transaction';
import {SECRET_KEY, ThongAccount} from '../config';
import WebService from '../webservice';

export default class User {
    constructor(app) {
        this.app = app;
        this.service = new WebService();
        this.UserSayHello = this.UserSayHello.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.makePayment = this.makePayment.bind(this);
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
        let querry = `https://gorilla.forest.network/broadcast_tx_commit?tx=${data_encoding}`;
        console.log(querry)
    }

    makePayment(receiver) {
        let tx = {
            version: 1,
            account: '',
            sequence: 8,
            memo: Buffer.alloc(0),
            operation: 'payment',
            params: {address: receiver, amount: 15},
            signature: Buffer.alloc(64, 0)
        }

        sign(tx, SECRET_KEY)
        let data_encoding = '0x'+encode(tx).toString('hex');

        this.service.get(`broadcast_tx_commit?tx=${data_encoding}`).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
}