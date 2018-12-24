import Account from "./account";
import Synchronization from "./sync";
import User from "./user";
import Post from "./post"
import Follow from  "./follow"
import Connection from "./connection";
import Transaction from "./transaction"

/* Model là nơi tập hợp các thành phần
    User, Follower, ....
    constructor có truyền vào app => mỗi model có thể truy xuất vào model khác
    Ex: User model có thể truy vào DB model.
*/
export default class Model {
    constructor(app) {
        this.app = app;
        this.account = new Account(app);
        this.user = new User(app);
        this.sync = new Synchronization(app);
        this.post = new Post(app);
        this.follow = new Follow(app);
        this.connection = new Connection(app);
        this.transaction = new Transaction(app);
    }
}