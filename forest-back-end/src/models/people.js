import _ from 'lodash';
export default class People {
    constructor(app) {
        this.app = app;
        this.getPeopleProfile = this.getPeopleProfile.bind(this);
    }

    getPeopleProfile() {
        this.app.service.get('abci_info').then(res => {
            let height = res.data.result.response.last_block_height;
            for (let i = 1; i <= height; ++i) {
                this.app.service.get(`block?height=${i}`).then(res => {
                    let tx = res.data.result.block.data.txs;
                    if (tx !== null) {
                        let data = this.app.helper.decodeTransaction(tx[0])
                        if (_.get(data, "operation") === 'create_account') {
                            let params = _.get(data, "params");
                            let address = _.get(params, "address");
                            //console.log(address)
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }
}