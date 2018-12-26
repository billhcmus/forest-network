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
                                .find({tags:{$elemMatch:{key:'account',value:{$in: arr_followings}}}})
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
                // item.avatar = user.picture
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
                    // item.content = content;
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
                            value:value.length
                        }
                    }
                    if(key === "followings"){
                            
                    }
                }
                // item.tx = item_tran.tx;

                return item;
            }
            catch (e) {
                console.log(e)
            }
        })
        // if (needMore === "0")
        //     return listFollowings.map(user =>{
        //         return user.followed
        //     })
        // let res = listFollowings.map(user =>{
        //     return this.app.db.collection('user').findOne({_id: user.followed})
        // })
        // let user = await this.app.models.user.getUser(publicKey)
        // let res = posts.map(async (post) =>{
        //     try {
        //         post.avatar = user.picture
        //         post.displayName = user.name
        //         post.like = 0
        //         post.haha = 0
        //         post.wow = 0
        //         post.sad = 0
        //         post.angry = 0
        //         post.love = 0
        //         post.comment = await this.app.db.collection('comment').find({object:post._id}).count();
        //         await this.app.db.collection('reaction').find({object:post._id}).toArray().then(reaction =>{
        //             reaction.forEach(react => {
        //                 if (react.reaction === 1)
        //                     post.like++;
        //                 else if (react.reaction === 2)
        //                     post.love++;
        //                 else if (react.reaction === 3)
        //                     post.haha++;
        //                 else if (react.reaction === 4)
        //                     post.wow++;
        //                 else if (react.reaction === 5)
        //                     post.sad++;
        //                 else if (react.reaction === 6)
        //                     post.angry++;
        //             })
        //         })
        //         let tmp = await this.app.db.collection('reaction').findOne({object:post._id,author:loginer});
        //         post.currentReaction = tmp ? tmp.reaction : 0;
        //         return post
        //     }
        //     catch (e) {
        //         console.log(e)
        //     }
        // })
        return Promise.all(res);
    }
}