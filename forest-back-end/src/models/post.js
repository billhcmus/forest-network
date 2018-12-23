import {encode, sign} from "../transaction";
import {SECRET_KEY} from "../config";
import _ from "lodash";

export default class Post {
    constructor(app) {
        this.app = app;
        this.userPost = this.userPost.bind(this);
        this.getPost = this.getPost.bind(this);
        this.getPostCount = this.getPostCount.bind(this);
    }

    async userPost(tx) {
        let res = await this.app.service.get(`broadcast_tx_commit?tx=${tx}`);
        if (_.get(res.data.result, "height") === "0") {
            return {code: -1}
        } else {
            return res.data
        }
    }

    async getPost(publicKey,loginer,start,count) {
        let posts = await this.app.db.collection('post').find({author: publicKey}).sort({time:-1})
            .skip(+start).limit(+count).toArray();
        let user = await this.app.models.user.getUser(publicKey)
        let res = posts.map(async (post) =>{
            try {
                post.avatar = user.picture
                post.displayName = user.name
                post.like = 0
                post.haha = 0
                post.wow = 0
                post.sad = 0
                post.angry = 0
                post.love = 0
                post.comment = await this.app.db.collection('comment').find({object:post._id}).count();
                await this.app.db.collection('reaction').find({object:post._id}).toArray().then(reaction =>{
                    reaction.forEach(react => {
                        if (react.reaction === 1)
                            post.like++;
                        else if (react.reaction === 2)
                            post.love++;
                        else if (react.reaction === 3)
                            post.haha++;
                        else if (react.reaction === 4)
                            post.wow++;
                        else if (react.reaction === 5)
                            post.sad++;
                        else if (react.reaction === 6)
                            post.angry++;
                    })
                })
                let tmp = await this.app.db.collection('reaction').findOne({object:post._id,author:loginer});
                post.currentReaction = tmp ? tmp.reaction : 0;
                return post
            }
            catch (e) {
                console.log(e)
            }
        })
        return Promise.all(res);
    }

    async getPostCount(publicKey) {
        let post = await this.app.db.collection('post').find({author: publicKey});
        return post.count();
    }

    async getPostDetail(object,loginer,start,count) {
        let comments = await this.app.db.collection('comment').find({object: object}).sort({time:-1})
            .skip(+start).limit(+count).toArray();
        let res = comments.map(async (comment) =>{
            try {
                let user = await this.app.models.user.getUser(comment.author);
                comment.avatar = user.picture
                comment.displayName = user.name
                comment.like = 0
                comment.haha = 0
                comment.wow = 0
                comment.sad = 0
                comment.angry = 0
                comment.love = 0
                comment.comment = await this.app.db.collection('comment').find({object:comment._id}).count();
                await this.app.db.collection('reaction').find({object:comment._id}).toArray().then(reaction =>{
                    reaction.forEach(react => {
                        if (react.reaction === 1)
                            comment.like++;
                        else if (react.reaction === 2)
                            comment.love++;
                        else if (react.reaction === 3)
                            comment.haha++;
                        else if (react.reaction === 4)
                            comment.wow++;
                        else if (react.reaction === 5)
                            comment.sad++;
                        else if (react.reaction === 6)
                            comment.angry++;
                    })
                })
                let tmp = await this.app.db.collection('reaction').findOne({object:comment._id,author:loginer});
                comment.currentReaction = tmp ? tmp.reaction : 0;
                return comment
            }
            catch (e) {
                console.log(e)
            }
        })
        return Promise.all(res);
    }
}