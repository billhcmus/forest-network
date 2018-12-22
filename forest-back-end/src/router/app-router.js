import _ from 'lodash';
import {encode, sign} from "../transaction";
import {SECRET_KEY} from "../config";

export default class AppRouter {
    constructor(app) {
        this.app = app;
        this.setupRouter = this.setupRouter.bind(this);
        this.setupRouter();
    }

    setupRouter() {
        const app = this.app;


        app.post('/api/users/login', (req, res, next) => {
           app.models.account.auth(req.body.publicKey).then((result)=>{
             return res.status(200).json(result);
           }).catch(err =>{
            return res.status(404).json({
                    error: err,
                });
            })
        })


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
            app.models.follow.getFollowings(req.query.id, req.query.needMore).then(rs => {
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
            app.models.follow.getFollowers(req.query.id).then(rs => {
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
         * @endpoint: /api/sendTx
         * @method: POST
         */
        app.post('/api/sendTx', (req, res, next) => {
            const body = _.get(req, 'body');
            app.models.post.userPost(body.tx).then(rs => {
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


    }
}