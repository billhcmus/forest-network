import {MongoClient} from 'mongodb'

const URL='mongodb://localhost:27017/'


export default class DataBase {
    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(URL,{ useNewUrlParser: true }, (err, db) => {
                if (err) {
                    return reject(err);
                }
                return resolve(db);
            });
        })
    }
}