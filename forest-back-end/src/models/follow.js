import {encode, sign} from "../transaction";
import {SECRET_KEY} from "../config";
import _ from "lodash";

export default class Follow {
    constructor(app) {
        this.app = app;
        this.getFollowingCount = this.getFollowingCount.bind(this);
        this.getFollowings = this.getFollowings.bind(this);
        this.getFollowers = this.getFollowers.bind(this);
        this.getFollowerCount = this.getFollowerCount.bind(this);
    }

    async getFollowingCount(publicKey) {
        let listFollowings = await this.app.db.collection('follow').find({following: publicKey});
        return listFollowings.count();
    }

    async getFollowerCount(publicKey) {
        let listFollowers = await this.app.db.collection('follow').find({followed: publicKey});
        return listFollowers.count();
    }

    async checkFollow(address1,address2) {
        let exist = await this.app.db.collection('follow').find({following: address1, followed: address2});
        return exist.count();
    }

    async getFollowings(publicKey,needMore) {
        let listFollowings = await this.app.db.collection('follow').find({following: publicKey}).toArray();
        if (needMore === "0")
            return listFollowings.map(user =>{
                return user.followed
            })
        let res = listFollowings.map(user =>{
            return this.app.db.collection('user').findOne({_id: user.followed})
        })
        return Promise.all(res)
    }

    async getFollowers(publicKey) {
        let listFollowers = await this.app.db.collection('follow').find({followed: publicKey}).toArray();
        let res = listFollowers.map(user =>{
            return this.app.db.collection('user').findOne({_id: user.following})
        })
        return Promise.all(res)
    }
}