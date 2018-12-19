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

        /**
         * @endpoint: /api/users
         * @method: GET
         */
        app.get('/api/users', (req, res, next) => {
            
        });

        /**
         * @endpoint: /api/people
         * @method: GET
         */
        app.get('/api/people', (req, res, next) => {
            
        })

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
         * @endpoint: /api/user
         * @method: POST
         */
        app.post('/api/user', (req, res, next) => {
            const body = _.get(req, 'body');
            app.models.account.createAccount(_.get(body, "publicKey")).then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(304).json({
                    err: err,
                });
            });
        });

        /**
         * @endpoint: /api/tweet
         * @method: POST
         */
        app.post('/api/tweet', (req, res, next) => {
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
         * @endpoint: /api/payment
         * @method: POST
         */
        app.post('/api/payment', (req, res, next) => {
            const body = _.get(req, 'body');
            app.models.account.payment(body.tx).then(rs => {
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
            app.models.post.getPost(req.query.id,req.query.start,req.query.count).then(rs => {
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
        app.get('/api/tweet/count', (req, res, next) => {
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