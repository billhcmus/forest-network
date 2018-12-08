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
let base64string = 'ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAADoQQ1RUNTIyLUNRMjAxNS8zMgEAIzDhU67FhbbPH1tOkMiwKuMPnuS98tNm/s27wMjNfWQfUT1L5St7LG3JTvNxp4fSxSsJWBVfOKJF3ptyjIHen8deWoBr+QlyXd9kKwBfBPjlDbllD9Y1Xa8zUI5OMIS9zmn0AQ==';
let buf = new Buffer(base64string, 'base64');

let tx = decode(buf);

console.log(tx);

server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${server.address().port}`)
});


export default app;