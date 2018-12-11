const {
    Keypair
} = require('stellar-base');
import {
    encode,
    sign
} from '../transaction';
import {
    SECRET_KEY,
    ThongAccount
} from '../config';
import WebService from '../webservice';

export default class Account {
    constructor(app) {
        this.app = app;
        this.service = new WebService();
        this.UserSayHello = this.UserSayHello.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.getTotalCount = this.getTotalCount.bind(this);
        this.getTransaction = this.getTransaction.bind(this);
        this.getAccountInfo = this.getAccountInfo.bind(this);
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
            this.service.get(`broadcast_tx_commit?tx=${data_encoding}`).then(res => {
                console.log(res.data);
                return resolve(key.privateKey())
            }).catch(err => {
                return reject(err);
            });
        });
    }

    async getTotalCount(publicKey) {
        let total_count = 0;
        await this.service.get(`tx_search?query="account='${publicKey}'"&prove=false&page=1&per_page=1`).then(res => {
            total_count = res.data.result.total_count;
        }).catch(err => {
            console.log(err);
        });
        return total_count;
    }

    async getTransaction(publicKey) {
        let transaction = [];
        let total_count = await this.getTotalCount(publicKey);
        let bound = Math.ceil(total_count / 100);
        for (let i = 1; i <= bound; ++i) {
            await this.service.get(`tx_search?query="account='${publicKey}'"&prove=false&page=${i}&per_page=100`).then(res => {
                transaction = transaction.concat(res.data.result.txs);
            }).catch(err => {
                console.log(err);
            });
        }
        return transaction;
    }

    getAccountInfo(publicKey) {
        this.getTransaction(publicKey).then(rs => {
            console.log(rs.length)
        });
    }
}