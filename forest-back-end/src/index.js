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
function listener(value) {
}
client.subscribe({query: "tm.event = \'NewBlock\'"} , listener);

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
    app.models.account.syncTxsToDB();
}).catch((err) => {
    throw err;
});


//app.models.account.createAccount();

//app.models.payment.makePayment(SECRET_KEY, ThongAccount);

//app.models.people.getPeopleProfile();
// app.models.account.getAmount(ThongAccount).then(rs => {
//     console.log(rs)
// });

server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${server.address().port}`)
});


export default app;