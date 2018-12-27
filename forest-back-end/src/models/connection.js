import {OrderedMap} from 'immutable'
import {ObjectID} from 'mongodb'
import _ from 'lodash';

export default class Connection {
    constructor(app) {
        this.app = app;
        this.connections = new OrderedMap();
        this.LoadConnection();
    }

    LoadConnection() {
        this.app.wss.on('connection', (ws) => {
            console.log("New client connected...");

            const socketId = new ObjectID().toString();

            const connection = {
                _id: `${socketId}`,
                ws: ws,
                publicKey: null
            }

            this.connections = this.connections.set(socketId, connection);

            ws.on('message', (message) => {
                const messageObj = JSON.parse(message);
                const action = _.get(messageObj, "action");
                switch(action) {
                    case 'auth':
                        try {
                            const userToken = _.get(messageObj, "payload"); // hien tai la public key

                            const connection = this.connections.get(socketId);
                            if (connection) {
                                connection.publicKey = userToken;
                                this.connections = this.connections.set(socketId, connection);
                            }
                        }
                        catch (e) {

                        }
                    break;
                }
            });

            ws.on('close', () => {
                this.connections = this.connections.remove(socketId);
                console.log("Client disconnected...");
            })
        });
    }

    SendToOnePerson(publicKey, message) {
        const connection = this.connections.find((con) => con.publicKey === publicKey);
        if (connection) {
            connection.ws.send(JSON.stringify(message));
        }
    }
}