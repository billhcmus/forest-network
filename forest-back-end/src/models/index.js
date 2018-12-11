import Account from "./account";
import People from "./people";
import Payment from "./payment";

/* Model là nơi tập hợp các thành phần
    User, Follower, ....
    constructor có truyền vào app => mỗi model có thể truy xuất vào model khác
    Ex: User model có thể truy vào DB model.
*/
export default class Model {
    constructor(app) {
        this.app = app;
        this.account = new Account(app);
        this.people = new People(app);
        this.payment = new Payment(app);
    }
}