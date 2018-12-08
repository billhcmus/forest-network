import _ from 'lodash'
import {ObjectID} from 'mongodb'
const jwt = require('jsonwebtoken');

export default class AppRouter {
    constructor(app) {
        this.app = app;
        this.setupRouter = this.setupRouter.bind(this);

        this.setupRouter();
    }

    verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        if (typeof(token) !== 'undefined') {
            req.token = token;
            next();
        } else {
            res.sendStatus(403);
        }
    }

    setupRouter() {
        const app = this.app;

        /**
         * @endpoint: /api/users/:id
         * @method: GET
         */
        app.get('/api/users/:id', (req, res, next) => {
            const userId = _.get(req, 'params.id');

            app.models.user.load(userId).then((user) => {
                _.unset(user, 'password');
                return res.status(200).json(user);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                })
            })
        });

        /**
         * @endpoint: /api/user/me
         * @method: GET
         */

         app.get('/api/user/me', this.verifyToken, (req, res) => {
            let userInfo;
            jwt.verify(req.token, 'secretkey', (err, userdata) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json(userdata.result);
                }
            })
         });


        app.get('/api/channel/:id/messages', this.verifyToken, (req, res) => {
            jwt.verify(req.token, 'secretkey', (err, data) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const channelId = _.get(req, 'params.id');
                    app.models.channel.loadMessageFromChannel(channelId).then((messages) => {
                        res.status(200).json(messages);
                    }).catch(err => {
                        return res.status(404).json({err: {message: "No Messages found."}});
                    })
                }
            });
        });

        app.get('/api/me/channels', this.verifyToken, (req, res) => {

            let userInfo;
            jwt.verify(req.token, 'secretkey', (err, userdata) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    userInfo = userdata.result;
                }
            });

            
            const userId = new ObjectID(_.get(userInfo, "_id"));

            const query = [
                {
                    $lookup: {
                        from: 'users',
                        localField: 'members',
                        foreignField: '_id',
                        as: 'membersinfo'
                    }
                },
                {
                    $match: {
                        members: {$all: [userId]}
                    }
                },
                {
                    $project: {
                        _id: true,
                        title: true,
                        avatar: true,
                        lastmessage: true,
                        created: true,
                        updated: true,
                        userId: true,
                        members: true,
                        membersinfo: {
                            _id: true,
                            name: true,
                            avatar: true,
                            created: true
                        }
                    }
                },
                {
                    $sort: {updated: -1}
                }
            ]
            
            app.models.channel.loadChannelsFromDB(query).then(channels=> {
                return res.status(200).json(channels);
            }).catch(err => {
                return res.status(404).json({err: {message: "No Channels found."}});
            })
        });
        /**
         * @endpoint: /api/users
         * @method: POST
         */

         app.post('/api/users', (req, res, next)=> {
            
         });

         app.post('/api/users/login', (req, res, next) => {
            const body = _.get(req, 'body');
            app.models.user.login(body).then((token) => {
                return res.status(200).json(token);
            }).catch(err => {
                return res.status(401).json({
                    error: err
                })
            })
        })

        app.post('/api/users/signup', (req, res, next) => {
            const body = _.get(req, 'body');
            app.models.user.createUser(body).then((token) => {
                return res.status(200).json(token);
            }).catch(err => {
                return res.status(401).json({
                    error: err
                })
            })
        })

        app.post('/api/users/search', (req, res, next) => {
            const keyword = _.get(req, 'body.search', '');
            app.models.user.search(keyword).then((result) => {
                _.unset(result, 'username');
                _.unset(result, 'password');
                return res.status(200).json(result);
            }).catch((err) => {
                return res.status(404).json({
                    error: 'Not found.'
                });
            })
        });

        /**
         * @endpoint: /api/channel/delete
         * @method: DELETE
         */
        app.delete('/api/channel/delete', (req, res, next) => {
            const data = req.body;
            app.models.channel.deleteChannel(data);
        });
    }
}