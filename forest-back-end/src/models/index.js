import Account from "./account";
import Payment from "./payment";
import Synchronization from "./sync";
import User from "./user";
import Interact from "./interact"
import Follow from  "./follow"

/* Model là nơi tập hợp các thành phần
    User, Follower, ....
    constructor có truyền vào app => mỗi model có thể truy xuất vào model khác
    Ex: User model có thể truy vào DB model.
*/
export default class Model {
    constructor(app) {
        this.app = app;
        this.account = new Account(app);
        this.payment = new Payment(app);
        this.user = new User(app);
        this.sync = new Synchronization(app);
        this.interact = new Interact(app);
        this.follow = new Follow(app);
    }
}