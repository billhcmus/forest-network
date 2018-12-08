'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config');

var _appRouter = require('./router/app-router');

var _appRouter2 = _interopRequireDefault(_appRouter);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use((0, _cors2.default)({ origin: '*' }));

app.use(_bodyParser2.default.json({
    limit: '50mb'
}));

var server = http.createServer(app);

app.routes = new _appRouter2.default(app);
app.models = new _models2.default(app);

// Connect to db
// assume that use Mongodb
// new DataBase().connect().then((db) => {
//     console.log("Connect to database succesfully");
//     var dbase = db.db("forest-network");
//     app.db = dbase;
// }).catch((err) => {
//     throw err;
// });

server.listen(process.env.PORT || _config.PORT, function () {
    console.log('App is running on port ' + server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map