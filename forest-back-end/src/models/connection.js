import {OrderedMap} from 'immutable'
import {ObjectID} from 'mongodb'
import _ from 'lodash'
export default class Connection {
    constructor(app) {
        this.app = app;
        this.connections = new OrderedMap();
        this.LoadConnection();
        this.ProcessData = this.ProcessData.bind(this);
        this.SendToOnePerson = this.SendToOnePerson.bind(this);
    }

    UpdateToClient(newblock) {
        let txs = newblock.block.data.txs;
        let block_time = newblock.block.header.time;
        if (txs !== null) {
            //Duyệt từng tx trong list tx của block
            for (let j = 0; j < txs.length; j++) {
                const data = this.app.helper.decodeTransaction(txs[j])
                this.ProcessData(data);
            }
        }
    }

    async ProcessData(data) {

        let message = {
            action: null,
            payload: null
        }
        //Get account from MongoDB
        const account = await this.app.db.collection('account').findOne({
            _id: data.account
        });

        //Process operation
        let operation = _.get(data, "operation");

        message.action = operation;

        if (operation === 'payment') {
            let params = _.get(data, "params")
            let address = _.get(params, "address");
            let amount = _.get(params, "amount");

            // Thong bao cho nguoi gui
            const sender = await this.app.db.collection('account').findOne({
                _id: data.account
            });
            message.payload = {
                message: "Mày đã chuyển tiền thành công",
                info: sender
            }

            this.SendToOnePerson(data.account, message);

            // Thong bao cho nguoi nhan
            const receiver = await this.app.db.collection('account').findOne({
                _id: address
            });

            message.payload = {
                message: "Có thằng chuyển tiền cho mày",
                info: receiver
            }
            
            this.SendToOnePerson(address, message);

        } else if (operation === 'post') {
            let params = _.get(data, "params")
            let content = _.get(params, "content");
            let keys = _.get(params, "keys");
            try {
                const newPost = {
                    _id: hashTx,
                    author: account._id,
                    content: decodeText(content),
                    time: block_time,
                    keys: keys,
                }
                // Bao cho bon following cua account nay la no co post moi
                console.log(`${account._id} post type ${newPost.content.type} text ${newPost.content.text} keys ${keys}`);
            } catch (err) {
                console.log(`${account._id} post ERR content ${content}`);
            }
        } else if (operation === 'interact') {
            let params = _.get(data, "params")
            let object = _.get(params, "object");
            let content = _.get(params, "content");
            //try check comment
            try {
                const newComment = {
                    _id: hashTx,
                    content: decodeText(content),
                    author: account._id,
                    object: object,
                    time: block_time,
                }
                // Cap nhat comment vao post co id nay
                console.log(`${account._id} comment: ${newComment.content.text} to object ${object}`);
            } catch (e) {
                //Not a comment
                //try check react
                try {
                    const newReact = {
                        reaction: decodeReact(content).reaction,
                        author: account._id,
                        object: object,
                    }
                    let foundReact = await this.app.db.collection('reaction').findOne({
                        author: account._id,
                        object: object
                    })
                    // gui react trong post nay

                    if (foundReact) {

                    } else {

                    }
                } catch (err) {
                    console.log(`${account._id} interact ERR ${err}`);
                }
            }
        } else
            return ('Operation is not support.');
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
                        const userToken = _.get(messageObj, "payload"); // hien tai la public key

                        const connection = this.connections.get(socketId);
                        if (connection) {
                            connection.publicKey = userToken;
                            this.connections = this.connections.set(socketId, connection);
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
        
        connection.ws.send(JSON.stringify(message))
    }
}