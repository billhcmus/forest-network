export default class User {
    constructor(app) {
        this.app = app;
        this.UserSayHello = this.UserSayHello.bind(this);
    }


    UserSayHello() {
        return new Promise((resolve, reject) => {
            resolve("Hello from User Model");
        })
    }
}