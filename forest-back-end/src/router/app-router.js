import _ from 'lodash';

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
                console.log(err)
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
            this.app.service.get(`broadcast_tx_commit?tx=${body.tx}`).then(res => {
                return resolve(res.data)
            }).catch(err => {
                return reject(err);
            });
        });
                /**
         * @endpoint: /api/update_account
         * @method: POST
         */
        app.post('/api/update_account', (req, res, next) => {
            const body = _.get(req, 'body');
            console.log(body)
            this.app.service.post(`broadcast_tx_commit?tx=${body.tx}`).then(result => {
                console.log(res);
                return res.status(200).json(result)
            }).catch(err => {
                console.log("failed")
                console.log(err)
                return res.status(304).json({erorr: err});
            });
        });
    }
}