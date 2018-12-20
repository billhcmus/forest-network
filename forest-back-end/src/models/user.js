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
            console.log("updateAccount")
            var pic = fs.readFileSync('./src/models/chau.jpg');

            // let data = new Buffer(pic);
            console.log(pic)

            // let tx = {
            //     version: 1,
            //     account: '',
            //     sequence: 19,
            //     memo: Buffer.alloc(0),
            //     operation: 'update_account',
            //     params: {key: 'picture', value: data},
            // }
            let tx = {
                version: 1,
                account: 'GADQGUVQECTOA5MF53XANG6QHNP7VPSPHET4AVHGDQOVXAF3XQVSWNH4',
                sequence: 11,
                memo: Buffer.alloc(0),
                operation: 'update_account',
                params: {
                    key: 'picture',
                    value: new Buffer(pic)
                },
                signature: new Buffer(64)
            }
        
            sign(tx, 'SBPESDLGQCJ2FK63GEXULOBCABLSKW4MK6X7O2463DIMH2FX6AFPPFPS');
            let data_encoding = '0x' + encode(tx).toString('hex');

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            // return new Promise((resolve, reject) => {
            //     this.app.service.post('broadcast_tx_commit', querystring.stringify({tx: data_encoding}), config)
            //     .then(res => {
            //         console.log(res.data.result);
            //         if (_.get(res.data.result, "height") === "0") {
            //             let rs = {code: -1}
            //             return resolve(rs);
            //         } else {
            //             console.log(res.data);
            //             return resolve(res.data)
            //         }
            //     }).catch(err => {
            //         return reject(err);
            //     });
            // });
        } catch(e) {
            console.log('Error:', e.stack);
        }
    }

    async getUser(publicKey) {
        let user = await this.app.db.collection('user').findOne({_id: publicKey});
        return user;
    }

}