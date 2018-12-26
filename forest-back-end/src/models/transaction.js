import {encode, sign} from '../transaction';
import {SECRET_KEY} from '../config';

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

    async getTransactions(id, page=1, limit=2){

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
            let user = await this.app.models.user.getUser(item_tran.tags[0].value)
            try {
                item_tran.avatar = user.picture
                item_tran.displayName = user.name
                return item_tran
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