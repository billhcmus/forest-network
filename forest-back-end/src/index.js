require("babel-core/register");
require("babel-polyfill");
import * as WebSocket from 'ws'
import * as http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParse from 'body-parser'
import { PORT, ThongAccount, WS_PRIVATE_NOTE_URL } from './config';
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

let wss = new WebSocket.Server({server});
app.wss = wss;
const client = RpcClient(WS_PRIVATE_NOTE_URL);

client.ws.on("close",(err)=>{
    console.log(err)
})

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

   // add the super account
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
    app.db.collection('user').findOne({_id: rootAccount._id}).then(res=>{
        if (!res)
            app.db.collection('user').insertOne({_id:'GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7'});
    });
    //Init index DB
    app.db.collection('post').createIndex({author:1})
    app.db.collection('follow').createIndex({following:1})
    app.db.collection('follow').createIndex({followed:1})
    app.db.collection('comment').createIndex({object:1})
    app.db.collection('reaction').createIndex({object:1})
    app.db.collection('reaction').createIndex({author:1})
    app.db.collection('transaction').createIndex({operation:1})


    //Sync and subcribe
    app.models.sync.syncTxsToDB().then(res=>{
        client.subscribe({query: "tm.event = \'NewBlock\'"} , (block) => {
            app.models.sync.syncTxsToDB(true);
        });
    });

}).catch((err) => {
    throw err;
});

//TEST PIC
//app.models.user.updateAccount();


server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${server.address().port}`)
});


export default app;