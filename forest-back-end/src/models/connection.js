import {OrderedMap} from 'immutable'
import _ from 'lodash'
export default class Connection {
    constructor(app) {
        this.app = app;
        this.connections = new OrderedMap();
        this.LoadConnection();
    }

    LoadConnection() {
        this.app.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                const messageObj = JSON.parse(message);
                const action = _.get(messageObj, "action");
                switch (action) {
                    case 'auth':
                        break;
                    default:
                        break;
                }
            });
            console.log("New client connected...");

            ws.on('close', () => {
                console.log("Client disconnected...");
            })
        });
    }
}