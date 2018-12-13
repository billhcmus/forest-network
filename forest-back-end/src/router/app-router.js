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
            app.models.account.UserSayHello().then(rs => {
                return res.status(200).json(rs);
            }).catch(err => {
                return res.status(404).json({
                    error: err,
                });
            });
        });

        /**
         * @endpoint: /api/people
         * @method: GET
         */
        app.get('/api/people', (req, res, next) => {
            
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
    }
}