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
            console.log(req.body)
           app.models.account.auth(req.body.publicKey).then((result)=>{
            console.log(result)
             return res.status(200).json(result);
           }).catch(err =>{
            return res.status(404).json({
                    error: err,
                });
            })
        })
        
        app.get('/api/sequence', (req, res, next) => {
            app.models.account.getSequence(req.query.id).then(rs => {
                console.log(rs)
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
    }
}