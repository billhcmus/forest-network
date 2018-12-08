import User from "./user";

/* Model là nơi tập hợp các thành phần
    User, Follower, ....
    constructor có truyền vào app => mỗi model có thể truy xuất vào model khác
    Ex: User model có thể truy vào DB model.
*/
export default class Model {
    constructor(app) {
        this.app = app;
        this.user = new User(app);
    }
}