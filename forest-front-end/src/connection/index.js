import {WEB_SOCKET_URL} from "../config";
import _ from 'lodash';
import {openNotification} from "../notification";
import {store} from "../index";
import {
    realtimeTweetDetailComment,
    realtimeTweetDetailStatus,
    realtimeTweetStatus,
    realtimeTweetList,
    increaseTweetCount,
    changeAccountInfo,
    changeUserInfo,
    changeCountFollowing,
    setUserInfo
} from "../actions";
import {Keypair} from 'stellar-base';
import loginer from "../reducers/UserReducer";

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
        const account = payload.account
        const activeUser = localStorage.getItem("ACTIVE_USER");
        if (payload.account && activeUser === payload.account._id){
            store.dispatch(changeAccountInfo(account));
        }
        switch (action) {
            case 'auth':
                console.log(payload);
                break;
            case 'create_account':
                openNotification(payload.title, payload.description);
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
                    //Khi nó đang xem chi tiết mà có th commment
                    if (poststatus._id === store.getState().tweetDetail.main._id) {
                        store.dispatch(realtimeTweetDetailComment(payload.data));
                    }
                    //Khi nó comment vào comment khi đang ở ngoài comment đó
                    else if (poststatus.isSubCommnent) {
                        store.dispatch(realtimeTweetDetailStatus(poststatus));
                    }
                    //Nó comment vào bài post khi ở ngoài bài post
                    store.dispatch(realtimeTweetStatus(poststatus));

                } else if (payload.type === "reaction") {
                    store.dispatch(realtimeTweetDetailStatus(poststatus));//Important
                    store.dispatch(realtimeTweetStatus(poststatus));//Important
                }
                break;
            case 'post':
                openNotification(payload.title, payload.description);
                //Nếu đang xem trang nó
                if (activeUser === payload.data.author) {
                    //thêm vào đầu listTweet
                    store.dispatch(increaseTweetCount());
                    store.dispatch(realtimeTweetList(payload.data));
                }
                break;
            case 'update_account':
                openNotification(payload.title, payload.description);
                //payload.data._id là id của thằng thay đổi thông tin

                //Update lại thèn loggin nếu là thông tin của nó
                if (payload.account._id === store.getState().loginer)
                    store.dispatch(setUserInfo(payload.data))

                //Nếu đang xem tài khoản của 1 thằng( không ngoại lệ đang xem trang của bản thân )
                if (activeUser === payload.account._id) {
                    //Update hình ảnh và tên thị của active user từ payload.data
                    if (payload.data) 
                        store.dispatch(changeUserInfo(payload.data))

                    //Update count Following Follower
                    store.dispatch(changeCountFollowing(payload.countFollowing))

                }
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