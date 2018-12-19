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

    async getPost(publicKey,start,count) {
        let post = await this.app.db.collection('post').find({author: publicKey}).skip(+start).limit(+count).toArray();
        let user = await this.app.models.user.getUser(publicKey)
        post.forEach(post =>{
            post.avatar = user.picture,
            post.displayName = user.name
        })
        return post;
    }

    async getPostCount(publicKey) {
        let count = await this.app.db.collection('post').find({author: publicKey}).count();
        return count;
    }
}