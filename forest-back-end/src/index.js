import * as http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParse from 'body-parser'
import { PORT } from './config';
import AppRouter from './router/app-router';
import Model from './models';
import DataBase from './database';

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

server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${server.address().port}`)
});

export default app;