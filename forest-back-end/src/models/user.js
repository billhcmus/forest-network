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