"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Model là nơi tập hợp các thành phần
    User, Follower, ....
    constructor có truyền vào app => mỗi model có thể truy xuất vào model khác
    Ex: User model có thể truy vào DB model.
*/
var Model = function Model(app) {
    _classCallCheck(this, Model);

    this.app = app;
    this.user = new _user2.default(app);
};

exports.default = Model;
//# sourceMappingURL=index.js.map