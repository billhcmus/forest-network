import {Button, Modal} from 'antd';
import React, {Component} from 'react';
import "../../css/compose-tweet.scss"
import {Keypair} from 'stellar-base';
import WebService from "../../webservice";
import {encode, sign} from '../../transaction/index';
import {encodeText} from '../../transaction/myv1'
import _ from 'lodash'
import {openNotification, warnNotification} from "../../notification";
import {CalculateOxy} from "../../constants";


class Comment extends Component {

    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            content:''
        };
    }

    textChange = (e) =>{
        this.setState({
            content:e.target.value
        })
    };

    handleSubmit = () => {
        if (this.state.content.length !== 0) {
            let secret = localStorage.getItem("SECRET_KEY");
            this.service.get(`api/sequence/?id=${
                Keypair.fromSecret(secret).publicKey()}`
            ).then(seq =>{
                let tx = {
                    version: 1,
                    account: '',
                    sequence: seq.data + 1,
                    memo: Buffer.alloc(0),
                    operation: 'interact',
                    params: {
                        object: this.props.objectid,
                        content : encodeText({
                            type: 1,
                            text: this.state.content,
                        }),
                    }
                };
                sign(tx,secret);
                let data_encoding = '0x' + encode(tx).toString('hex');

                this.service.get(`api/accountInfo/?id=${Keypair.fromSecret(secret).publicKey()}`).then(account => {
                    let oxy = CalculateOxy(account.data.balance, account.data.bandwidthTime, account.data.bandwidth);

                    if (encode(tx).length > oxy) {
                        warnNotification("Energy", "Not enough Oxy");
                    } else {
                        this.service.post(`api/users/sendTx`,{tx: data_encoding}).then((response) => {
                            this.props.onCancel();
                            this.setState({
                                content:""
                            })
                        }).catch(err => {
                            const message = _.get(err, 'response.data.error.message', "Comment Unsuccess!");
                            openNotification("Error", message);
                        })
                    }
                })
            })
        }
    };

    render() {
        return (
            <Modal
                title="Comment"
                centered
                visible={this.props.isCommentShow}
                onCancel={() => this.props.onCancel()}
                footer={null}
                style={{padding:0}}
            >
                <div className="modal-body">
                    <div className="tweet-box-content">
                        <div className="tweet-content">
                           <textarea className="comment-text-area"
                                     onChange={(e)=>this.textChange(e)}
                                     placeholder="What do you thing?"
                                     name="status"/>
                        </div>

                        <div className="tweet-toolbar">
                            <Button type="primary"
                                    onClick={this.handleSubmit}
                                    style={{backgroundColor:"#1da1f2", borderRadius: '50px',fontWeight:'bold',float: 'right'}}>Comment</Button>
                        </div>
                    </div>
                </div>
            </Modal>

        );
    }
}
export default Comment;
