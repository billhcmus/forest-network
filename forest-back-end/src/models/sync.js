import {
    verify,
    hash
} from '../transaction';
const crypto = require('crypto');
import {
    decodeText,
    decodeFollowings,
    decodeReact
} from '../transaction/myv1';
import _ from 'lodash';

const base32 = require('base32.js');
const moment = require('moment');

const BANDWIDTH_PERIOD = 86400;
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

export default class Synchronization {
    constructor(app) {
        this.app = app;
    }

    async syncTxsToDB() {
        let beginHeight = 0;
        let metaHeight = await this.app.db.collection('metadata').findOne({
            _id: 'finalHeight'
        });
        if (metaHeight) {
            beginHeight = metaHeight._value;
        } else {
            await this.app.db.collection('metadata').insertOne({
                _id: 'finalHeight',
                _value: 0
            });
        }

        let status = await this.app.service.get('status')
        let lastheight = status.data.result.sync_info.latest_block_height;
        console.log("SyncTX: ", beginHeight, "-->", lastheight);
        //Duyệt từng height
        let isValidTx = true;
        for (let i = beginHeight + 1; i <= lastheight; ++i) {
            let res = await this.app.service.get(`block?height=${i}`)
            let txs = res.data.result.block.data.txs;
            let block_time = res.data.result.block.header.time;
            isValidTx = true;
            if (txs !== null) {
                //Duyệt từng tx trong list tx của block
                for (let j = 0; j < txs.length; j++) {
                    console.log("Height", i)
                    let err = await this.checkAndWriteToDB(i, txs[j], block_time);
                    if (err) {
                        console.log(err);
                        isValidTx = false;
                    }
                }
            }
            await this.app.db.collection('metadata').findOneAndUpdate({
                _id: 'finalHeight'
            }, {
                $set: {
                    _value: i
                }
            })

        }
        return isValidTx;
    }

    async checkTransaction(tx, block_time) {
        //Verify tx có hợp lệ không, theo các trường hợp trong code server.js

        const txSize = Buffer(tx, 'base64').length;
        const data = this.app.helper.decodeTransaction(tx) //decode từ buffer binary sang json
        const hashTx = hash(data);

        // Check signature
        if (!verify(data)) {
            console.log('Wrong signature');
            return false;
        }

        //Get account from MongoDB
        const account = await this.app.db.collection('account').findOne({
            _id: data.account
        });
        // Check account
        if (!account) {
            console.log('Account does not exists');
            return false;
        }

        // Check sequence
        const nextSequence = account.sequence + 1;
        if (nextSequence !== data.sequence) {
            console.log('Sequence mismatch');
            return false;
        }

        // Check memo
        if (data.memo.length > 32) {
            console.log('Memo has more than 32 bytes.');
            return false;
        }

        //Check bandwidth
        const diff = account.bandwidthTime ?
            moment(block_time).unix() - moment(account.bandwidthTime).unix() :
            BANDWIDTH_PERIOD;
        const bandwidthLimit = account.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;
        // 24 hours window max 65kB
        account.bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * account.bandwidth + txSize);
        if (account.bandwidth > bandwidthLimit) {
            console.log('Bandwidth limit exceeded');
            return false;
        }

        // Check bandwidth usage < account balance
        const blockedAmount = Math.ceil(account.bandwidth / NETWORK_BANDWIDTH * MAX_CELLULOSE);
        if (account.balance < blockedAmount) {
            console.log('Account balance must greater blocked amount due to bandwidth used');
            return false;
        }
        return true;
    }

    async checkAndWriteToDB(block, tx, block_time) {
        //Verify tx có hợp lệ không, theo các trường hợp trong code server.js

        const txSize = Buffer(tx, 'base64').length;
        const data = this.app.helper.decodeTransaction(tx) //decode từ buffer binary sang json
        const hashTx = hash(data);

        // Check signature
        if (!verify(data)) {
            return 'Wrong signature';
        }

        //Get account from MongoDB
        const account = await this.app.db.collection('account').findOne({
            _id: data.account
        });
        // Check account
        if (!account) {
            return 'Account does not exists';
        }

        // Check sequence
        const nextSequence = account.sequence + 1;
        if (nextSequence !== data.sequence) {
            return ('Sequence mismatch');
        }

        // Check memo
        if (data.memo.length > 32) {
            return ('Memo has more than 32 bytes.');
        }

        //Check bandwidth
        const diff = account.bandwidthTime ?
            moment(block_time).unix() - moment(account.bandwidthTime).unix() :
            BANDWIDTH_PERIOD;
        const bandwidthLimit = account.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;
        // 24 hours window max 65kB
        account.bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * account.bandwidth + txSize);
        if (account.bandwidth > bandwidthLimit) {
            return ('Bandwidth limit exceeded');
        }

        // Check bandwidth usage < account balance
        const blockedAmount = Math.ceil(account.bandwidth / NETWORK_BANDWIDTH * MAX_CELLULOSE);
        if (account.balance < blockedAmount) {
            return ('Account balance must greater blocked amount due to bandwidth used');
        }

        await this.app.db.collection('account').findOneAndUpdate({
            _id: data.account
        }, {
            $set: {
                bandwidthTime: block_time,
                sequence: nextSequence,
                bandwidth: account.bandwidth,
            }
        })

        //Process operation
        let operation = _.get(data, "operation");
        if (operation === 'create_account') {
            let params = _.get(data, "params")
            let address = _.get(params, "address");

            const found = await this.app.db.collection('account').findOne({
                _id: address
            });

            if (found) {
                return ('Account address existed');
            }

            const newAccount = {
                _id: address,
                sequence: 0,
                balance: 0,
                bandwidth: 0,
            }
            await this.app.db.collection('account').insertOne(newAccount);

            const newUser = {
                _id: address,
            }
            await this.app.db.collection('user').insertOne(newUser);
            console.log(`${account._id} create ${address}`);
        } else if (operation === 'payment') {
            let params = _.get(data, "params")
            let address = _.get(params, "address");
            let amount = _.get(params, "amount");

            const found = await this.app.db.collection('account').findOne({
                _id: address
            });
            if (!found) {
                return ('Destination address does not exist');
            }
            if (address === data.account) {
                return ('Cannot transfer to the same address');
            }
            if (amount <= 0) {
                return ('Amount must be greater than 0');
            }
            if (amount > account.balance) {
                return ('Amount must be less or equal to source balance');
            }

            //tru nguoi gui
            await this.app.db.collection('account').findOneAndUpdate({
                _id: account._id
            }, {
                $inc: {
                    balance: -amount
                }
            })
            //cong nguoi nhan
            await this.app.db.collection('account').findOneAndUpdate({
                _id: address
            }, {
                $inc: {
                    balance: amount
                }
            })

            console.log(`${account._id} transfered ${amount} to ${address}`);

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
                await this.app.db.collection('post').insertOne(newPost);
                console.log(`${account._id} post type ${newPost.content.type} text ${newPost.content.text} keys ${keys}`);
            } catch (err) {
                console.log(`${account._id} post ERR content ${content}`);
            }
        } else if (operation === 'update_account') {
            let params = _.get(data, "params")
            let key = _.get(params, "key");
            let value = _.get(params, "value");
            try {
                if (key === "name") {
                    await this.app.db.collection('user').findOneAndUpdate({
                        _id: data.account
                    }, {
                        $set: {
                            name: value.toString('utf-8')
                        }
                    })
                } else if (key === "picture") {
                    await this.app.db.collection('user').findOneAndUpdate({
                        _id: data.account
                    }, {
                        $set: {
                            picture: value
                        }
                    })
                } else if (key === "followings") {
                    const list = decodeFollowings(value).addresses.map(add => {
                        return base32.encode(add)
                    });
                    await this.app.db.collection('follow').deleteMany({
                        following: data.account
                    })
                    list.forEach(item => {
                        this.app.db.collection('follow').insertOne({
                            _id: crypto.createHash('sha256')
                                .update(data.account + item)
                                .digest()
                                .slice(0, 16)
                                .toString('hex'),
                            following: data.account,
                            followed: item,
                        })
                    })
                }
                console.log(`${account._id} update_account key ${key} value ${value}`);
            } catch (e) {
                console.log(`${account._id} update_account ERR: ${e}`);
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
                await this.app.db.collection('comment').insertOne(newComment);
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
                    if (foundReact) {
                        await this.app.db.collection('reaction').findOneAndUpdate({
                            _id: foundReact._id
                        }, {
                            $set: {
                                reaction: newReact.reaction
                            }
                        });
                    } else {
                        await this.app.db.collection('reaction').insertOne(newReact);
                    }
                    console.log(`${account._id} react: ${newReact.reaction} to object ${object}`);
                } catch (err) {
                    console.log(`${account._id} interact ERR ${err}`);
                    return (err)
                }
            }
        } else
            return ('Operation is not support.');


        // Add transaction to db
        let tags = []; //to search
        if (data.account) {
            tags.push({
                key: "account",
                value: data.account
            });
        }
        if (data.params && data.params.address && data.params.address !== data.account) {
            tags.push({
                key: "account",
                value: data.params.address
            });
        }
        if (data.params && data.params.object) {
            tags.push({
                key: "object",
                value: Buffer.from(data.params.object)
            });
        }

        try {
            const newTransaction = {
                _id: hashTx,
                block: block,
                operation: operation,
                time: block_time,
                tags: tags,
                tx: data
            }
            await this.app.db.collection('transaction').insertOne(newTransaction);
        } catch (e) {
            console.log(e)
        }
    }
}