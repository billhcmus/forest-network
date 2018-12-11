import * as http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParse from 'body-parser'
import { PORT, ThongAccount } from './config';
import AppRouter from './router/app-router';
import Model from './models';
import DataBase from './database';
import {decode} from './transaction'
import Helper from './helper';
const vstruct = require('varstruct');
const {Keypair} = require('stellar-base');
const {RpcClient} = require('tendermint');
import {SECRET_KEY, PUBLIC_KEY} from './config';
import WebService from './webservice';

const app = express();

app.use(morgan('dev'));
app.use(cors({origin: '*'}));

app.use(bodyParse.json({
    limit: '50mb'
}));

const server = http.createServer(app);
const client = RpcClient('wss://gorilla.forest.network:443/websocket');

app.routes = new AppRouter(app);
app.models = new Model(app);

function listener(value) {
    console.log('New block added');
}

client.subscribe({query: "tm.event = \'NewBlock\'"} , listener);

app.client = client;
app.helper = new Helper();
app.service = new WebService();

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
// let base64string = 'ATBJ34PBhsk0mJEuSi6bwIAEKKbwV4MbJ13gDROJrdAbeCBLAAAAAAAAAAoAAgArMAcDUrAgpuB1he7uBpvQO1/6vk85J8BU5hwdW4C7vCsrNPwAAAAAAAAAD47Uagnak1HZeekQ/Rhem3LtOUj9geE1SbcYEuA2oAGVfXnEWeZaQ95T7J0QUzJ3TpDeTUtqsFC6hBobL1FMwQ4=';
// let buf = new Buffer(base64string, 'base64');

// let tx = decode(buf);

// console.log(tx);

//app.models.account.createAccount();

//app.models.payment.makePayment(SECRET_KEY, ThongAccount);

//app.models.people.getPeopleProfile();
app.models.account.getAmount(ThongAccount).then(rs => {
    console.log(rs)
})

server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${server.address().port}`)
});


export default app;