import * as http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParse from 'body-parser'
import { PORT } from './config';
import AppRouter from './router/app-router';
import Model from './models';
import DataBase from './database';
import {decode} from './transaction'
const vstruct = require('varstruct');
const {Keypair} = require('stellar-base');

const app = express();

app.use(morgan('dev'));
app.use(cors({origin: '*'}));

app.use(bodyParse.json({
    limit: '50mb'
}));

const server = http.createServer(app);

app.routes = new AppRouter(app);
app.models = new Model(app);

// Connect to db
// assume that use Mongodb
// new DataBase().connect().then((db) => {
//     console.log("Connect to database succesfully");
//     var dbase = db.db("forest-network");
//     app.db = dbase;
// }).catch((err) => {
//     throw err;
// });

// Test decode transaction
// let base64string = 'ATA8i2kusx/LGR5eAZ/7L2FhJIL8wtK3QdYou1L0XkGbXSLfAAAAAAAAAAEAAQAjMB3E9jeB6Vq5oRwzKMwi5omyIV71sg7mRlMKKXqNwzMkDCjZtz7CjPZuCL8TmGDO2fjIH8UcLxNYBM2KkRb/l89C7vMg3wITL2dmGwQXihie7bgL20r1i5yu+6PO//p89GUJ';
// let buf = new Buffer(base64string, 'base64');

// let tx = decode(buf);

// console.log(tx);

app.models.user.createAccount();


server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${server.address().port}`)
});


export default app;