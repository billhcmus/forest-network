import _ from 'lodash';
import {encode, sign} from "../transaction";
import {SECRET_KEY} from "../config";
var querystring = require('querystring');
import axios from 'axios';
// import {API_URL} from '../config';

export default class AppRouter {
    constructor(app) {
        this.app = app;
        this.setupRouter = this.setupRouter.bind(this);
        this.setupRouter();
    }

    setupRouter() {
        const app = this.app;


        /**
         * @endpoint: /api/users/login
         * @method: POST
         */
        app.post('/api/users/login', (req, res, next) => {
           app.models.account.auth(req.body.publicKey).then((result)=>{
             return res.status(200).json(result);
           }).catch(err =>{
            return res.status(404).json({
                    error: err,
                });
            })
        });

        app.post('/api/accounts/register', (req, res) => {
            
        });

         /**
         * @endpoint: /api/users/sendTx
         * @method: POST
         */
        app.post('/api/users/sendTx', (req, res, next) => {
            const body = _.get(req, 'body');
            app.models.post.createPost(body.tx).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });

        app.get('/api/accountInfo', (req, res, next) => {
            app.models.account.getAccount(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                });
            });
        })

        app.get('/api/userInfo', (req, res, next) => {
            app.models.user.getUser(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                });
            });
        })


        app.get('/api/sequence', (req, res, next) => {
            app.models.account.getSequence(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                });
            });
        })

        /**
         * @endpoint: /api/followingsCount
         * @method: GET
         */
        app.get('/api/followingsCount', (req, res, next) => {
            app.models.follow.getFollowingCount(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });

        /**
         * @endpoint: /api/followings
         * @method: GET
         */
        app.get('/api/followings', (req, res, next) => {
            app.models.follow.getFollowings(req.query.id, req.query.needMore,req.query.start,req.query.count).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                });
            });
        })


        /**
         * @endpoint: /api/followersCount
         * @method: GET
         */
        app.get('/api/followersCount', (req, res, next) => {
            app.models.follow.getFollowerCount(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });

        /**
         * @endpoint: /api/followers
         * @method: GET
         */
        app.get('/api/followers', (req, res, next) => {
            app.models.follow.getFollowers(req.query.id,req.query.start,req.query.count).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                });
            });
        })

        /**
         * @endpoint: /api/isfollow
         * @method: GET
         */
        app.get('/api/isfollow', (req, res, next) => {
            app.models.follow.checkFollow(req.query.address1,req.query.address2).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });


        /**
         * @endpoint: /api/tweet
         * @method: GET
         */
        app.get('/api/tweet', (req, res, next) => {
            app.models.post.getPost(req.query.id,req.query.loginer,req.query.start,req.query.count).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });

        /**
         * @endpoint: /api/tweet/count
         * @method: GET
         */
        app.get('/api/tweetCount', (req, res, next) => {
            app.models.post.getPostCount(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });

        /**
         * @endpoint: /api/tweet/count
         * @method: GET
         */
        app.get('/api/tweetCount', (req, res, next) => {
            app.models.post.getPostCount(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });
                /**
         * @endpoint: /api/user_info
         * @method: POST
         */
        app.post('/api/user_info', (req, res, next) => {
            const body = _.get(req, 'body');
            const content_type = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            this.app.service.post('broadcast_tx_commit', querystring.stringify(body), content_type)
                .then(rs => {
                    if (_.get(rs.data.result, "height") === "0") {
                        let statu_code = {code: -1}
                        res.status(304)
                            .json({status: 'update failed',
                                   errors: rs.data.result 
                        })

                    } else {
                        console.log("else")
                        console.log(rs.data.result);
                        res.status(200).json({
                            status: 'update success',
                            result: rs.data.result
                        })
                    }
                }).catch(err => {
                    res.status(304)
                        .json({status: 'update failed',
                               errors: err.data 
                    })
                });

        });
        
        /**
         * @endpoint: /api/tweet/count
         * @method: GET
         */
        app.get('/api/tweetDetail', (req, res, next) => {
            app.models.post.getPostDetail(req.query.object,req.query.loginer,req.query.start,req.query.count).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });

        /**
         * @endpoint: /api/payments
         * @method: GET
         */
        app.get('/api/payments', (req, res, next) => {
            app.models.transaction.getPayments(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                });
            });
        })

        /**
         * @endpoint: /api/transaction
         * @method: GET
         */
        app.get('/api/transaction', (req, res, next) => {
            app.models.transaction.getTransaction(req.query.id).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                });
            });
        })
    }
}


