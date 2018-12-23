import {encode, sign} from '../transaction';
import {SECRET_KEY} from '../config';

"use strict";

export default class Payment {
    constructor(app) {
        this.app = app;
        this.getPayments = this.getPayments.bind(this);
    }

    async getPayments(publicKey,start,count) {
        let listPayments = await this.app.db.collection('transaction')
            .find({operation:'payment',tags:{$elemMatch:{key:'account',value:publicKey}}})
            .sort({time:-1}).skip(+start).limit(+count).toArray();
        return listPayments
    }
}