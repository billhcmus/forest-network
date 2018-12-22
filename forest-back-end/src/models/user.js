import {decode, encode, sign} from "../transaction";
import {SECRET_KEY} from "../config";
import _ from "lodash";

const fs = require('fs');


var querystring = require('querystring');


'use strict'
export default class User {
    constructor(app) {
        this.app = app;
        this.getUser = this.getUser.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
    }

    updateAccount() {
        try {  
            var pic = fs.readFileSync('./src/models/chau.jpg');

            let data = new Buffer(pic);

            let tx = {
                version: 1,
                account: '',
                sequence: 19,
                memo: Buffer.alloc(0),
                operation: 'update_account',
                params: {key: 'picture', value: data},
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

    async getUser(publicKey) {
        let user = await this.app.db.collection('user').findOne({_id: publicKey});
        return user;
    }

    async getInteractsCount(publicKey,object) {
        let post = await this.app.db.collection('post').find({author: publicKey});
        return post.count();
    }

}