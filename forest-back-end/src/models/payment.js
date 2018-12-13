import {encode, sign} from '../transaction';
import {SECRET_KEY} from '../config';

export default class Payment {
    constructor(app) {
        this.app = app;
        this.makePayment = this.makePayment.bind(this);
    }

    makePayment(sender, receiver) {
        return new Promise((resolve, reject) => {
            this.app.service.get(`broadcast_tx_commit?tx=${data_encoding}`).then(res => {
                console.log(res.data);
                return resolve(res.data)
            }).catch(err => {
                return reject(err);
            });
        });
    }
}