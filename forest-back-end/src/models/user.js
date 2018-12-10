const {Keypair} = require('stellar-base');
import {encode, decode, verify, sign, hash} from '../transaction'

export default class User {
    constructor(app) {
        this.app = app;
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
        let secretKey = key.secret();
        let publicKey = key.publicKey();
        
        let tx = {
            version: 1,
            account: 'GDMZJFJVTR4PWYGZJEHN2USXQSEXNKET4AWDIUNJX7ZE56PUCTEY5NOO',
            sequence: 1,
            memo: Buffer.alloc(0),
            operation: 'create_account',
            params: {address: publicKey},
            signature: Buffer.alloc(64, 0)
        }

        sign(tx, secretKey);
        let data_encoding = '0x'+encode(tx).toString('hex');
        let querry = `https://komodo.forest.network/broadcast_tx_commit?tx=${data_encoding}`;
        console.log(querry)
    }

    makePayment() {
        let address = 'GDMZJFJVTR4PWYGZJEHN2USXQSEXNKET4AWDIUNJX7ZE56PUCTEY5NOO';
        const key = Keypair.random();
        let secretKey = key.secret();
        let publicKey = key.publicKey();
        let tx = {
            version: 1,
            account: '',
            sequence: 1,
            memo: Buffer.alloc(0),
            operation: 'payment',
            params: {address: address, amount: 10000},
            signature: Buffer.alloc(64, 0)
        }

        sign(tx, secretKey)
        let data_encoding = '0x'+encode(tx).toString('hex');
        let querry = `https://komodo.forest.network/broadcast_tx_commit?tx=${data_encoding}`;
    }
}