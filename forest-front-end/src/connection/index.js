import {WEB_SOCKET_URL} from "../config";
import _ from 'lodash';

export default class Connection {
    constructor() {
        this.ws = null;
        this.isConnected = false;
        this.connect();
    }

    connect() {
        this.ws = new WebSocket(WEB_SOCKET_URL);

        this.ws.onopen = () => {
            this.isConnected = true;

            this.ws.onmessage = (event) => {
                Connection.catchMessage(event.data);
            };

            this.ws.onclose = () => {
                this.isConnected = false;
            };

            this.ws.onerror = () => {
                this.isConnected = false;
            };

        }
    }

    static catchMessage(message) {
        const messageObj = JSON.parse(message);

        const action = _.get(messageObj, "action");
        const payload = _.get(messageObj, "payload");

        switch (action) {
            case 'auth':
                console.log(payload);
                break;
            default:
                break;
        }
    }

    send(msg = {}) {
        if (this.ws && this.isConnected) {
            const message = JSON.stringify(msg);
            this.ws.send(message);
        }
    }
}