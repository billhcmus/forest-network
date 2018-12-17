require("babel-core/register");
require("babel-polyfill");
import * as http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParse from 'body-parser'
import { PORT, ThongAccount } from './config';
import AppRouter from './router/app-router';
import Model from './models';
import DataBase from './database';
import Helper from './helper';
import {RpcClient} from 'tendermint';
import WebService from './webservice';
import {SECRET_KEY, PUBLIC_KEY} from './config';


const app = express();
app.use(morgan('dev'));
app.use(cors({origin: '*'}));


app.use(bodyParse.json({
    limit: '50mb'
}));

const server = http.createServer(app);

const client = RpcClient('wss://gorilla.forest.network:443/websocket');

app.client = client;
app.helper = new Helper();
app.service = new WebService();
app.routes = new AppRouter(app);
app.models = new Model(app);

// Connect to db
// assume that use Mongodb
new DataBase().connect().then((db) => {
    console.log("Connect to database succesfully");
    var dbase = db.db("forest-network");
    app.db = dbase;

   //add the super account
    const rootAccount = {
        _id: 'GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7',
        sequence: 0,
        balance: Number.MAX_SAFE_INTEGER,
        bandwidth: 0,
    }
    app.db.collection('account').findOne({_id: rootAccount._id}).then(res=>{
        if (!res)
            app.db.collection('account').insertOne(rootAccount);
    });

    //Sync and subcribe
    app.models.sync.syncTxsToDB().then(res=>{
        client.subscribe({query: "tm.event = \'NewBlock\'"} , () => {
           app.sync.account.syncTxsToDB();
        });
    });


}).catch((err) => {
    throw err;
});


//app.models.account.createAccount();
// app.models.payment.makePaymentTest(SECRET_KEY, ThongAccount);
//app.models.people.getPeopleProfile();
// app.models.account.getAmount(ThongAccount).then(rs => {
//     console.log(rs)
// });


server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${server.address().port}`)
});


export default app;