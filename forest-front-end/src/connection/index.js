import {WEB_SOCKET_URL} from "../config";
import _ from 'lodash';
import {openNotification} from "../notification";
import {store} from "../index";
import {addTweetDetailComment, updateTweetStatus} from "../actions";
import {Keypair} from 'stellar-base';

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

            this.authentication();
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

    authentication() {
        const token = localStorage.getItem("token");
        const message = {
            action: 'auth',
            payload: token
        };

        this.send(message);
    }

    static catchMessage(message) {
        const messageObj = JSON.parse(message);
        const action = _.get(messageObj, "action");
        const payload = _.get(messageObj, "payload");
        const poststatus = _.get(messageObj, "poststatus");
        switch (action) {
            case 'auth':
                console.log(payload);
                break;
            case 'payment':
                openNotification(payload.title, payload.description);
                break;
            case 'interact':
                const publicKey = Keypair.fromSecret(localStorage.getItem("SECRET_KEY")).publicKey();
                if (payload.data.author !== publicKey) {
                    openNotification(payload.title, payload.description);
                }

                if (payload.type === "comment") {
                    let listComments = [];
                    listComments.push(payload.data);
                    store.dispatch(addTweetDetailComment(listComments));
                } else if (payload.type === "reaction") {

                }
                store.dispatch(updateTweetStatus(_.get(poststatus, "_id"), poststatus));

                break;
            case 'post':
                openNotification(payload.title, payload.description);
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