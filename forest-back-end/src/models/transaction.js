import {encode, sign} from '../transaction';
import {SECRET_KEY} from '../config';
import {
    decodeText,
    decodeFollowings,
    decodeReact
} from '../transaction/myv1';
import _ from 'lodash';

"use strict";

export default class Transaction {
    constructor(app) {
        this.app = app;
        this.getPayments = this.getPayments.bind(this);
        this.getTransaction = this.getTransaction.bind(this);
    }

    async getPayments(publicKey) {
        let listPayments = await this.app.db.collection('transaction')
            .find({operation:'payment',tags:{$elemMatch:{key:'account',value:publicKey}}})
            .sort({time:-1}).toArray();
        return listPayments
    }

    async getTransaction(id){
        let res = await this.app.db.collection('transaction').findOne({_id:id});
        return res
    }

    async getNewFeeds(id, page=1, limit=2){

        //get list you folloe
        let listFollowings = await this.app.db.collection('follow')
                                            .find({following: id})
                                            .toArray();
        let arr_followings = listFollowings.map(item=>{
            return item.followed
        })

        let trans = await this.app.db.collection('transaction')
                                .find({tags:{$elemMatch:{key:'account',value:{$in: arr_followings}}}, operation: {$ne: "interact"}})
                                .sort({time:-1})
                                .skip(+page).limit(+limit)
                                .toArray();

        let res = trans.map(async (item_tran)=>{
            let item = {
                _id: item_tran._id,
                operation: item_tran.operation,
                time: item_tran.time,
            };

            let user = await this.app.models.user.getUser(item_tran.tags[0].value)
            try {
                item.avatar = user.picture
                item.displayName = user.name
                item.author = user._id

                if(item_tran.operation==="create_account"){
                    let params = _.get(item_tran.tx, "params");
                    let address = _.get(params, "address");
                    item.address = address
                }

                if (item_tran.operation === "post") {
                    let params = _.get(item_tran.tx, "params")
                    let content = _.get(params, "content");
                    item.content = decodeText(content.buffer);
                }

                if(item_tran.operation === 'payment') {
                    let params = _.get(item_tran.tx, "params")
                    let address = _.get(params, "address");
                    let amount = _.get(params, "amount");
                    let userAddress = await this.app.models.user.getUser(address)
                    item.amount = amount;
                    item.addressName = userAddress.name;
                    item.address = address;
                }

                if(item_tran.operation === 'update_account')
                {
                    let params = _.get(item_tran.tx, "params")
                    let key = _.get(params, "key");
                    let value = _.get(params, "value");
                    if(key === "name") {
                        item.params = {
                            type: key,
                            value:value.toString('utf-8')
                        }
                    }
                    if(key === "picture") {
                        item.params = {
                            type: key,
                            value:value.toString().length + "bytes"
                        }
                    }
                    if(key === "followings"){
                        let list = decodeFollowings(value).addresses.map(add => {
                            console.log(base32.encode(add))
                            return base32.encode(add)
                        });
                        // let follwingsls = list.map(async(follow_item)=>{
                        //     console.log(follow_item)
                        //     let it = await this.app.models.user.getUser(follow_item)
                        //     return {
                        //         name: it.name,
                        //         address: it._id
                        //     }
                        // })
                        console.log(list)
                        item.follwings = list;
                    }
                }
                item.tx = item_tran.tx;

                return item;
            }
            catch (e) {
                console.log(e)
            }
        })
        return Promise.all(res);
    }
}