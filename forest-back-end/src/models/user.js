import {encode, sign} from "../transaction";
import {SECRET_KEY} from "../config";
import _ from "lodash";

export default class User {
    constructor(app) {
        this.app = app;
        this.getUser = this.getUser.bind(this);
    }

    async getUser(publicKey) {
        let user = await this.app.db.collection('user').findOne({_id: publicKey});
        return user;
    }

}