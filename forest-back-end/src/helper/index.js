import {decode} from '../transaction'

export default class Helper {
    constructor() {
        this.decodeTransaction = this.decodeTransaction.bind(this);
    }

    decodeTransaction(tx) {
        let buf = new Buffer(tx, 'base64');
        return decode(buf);
    }

}