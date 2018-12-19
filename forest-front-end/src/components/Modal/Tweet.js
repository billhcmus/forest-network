import { Form, Icon, Input, Button, Modal } from 'antd';
import React, {Component} from 'react';
import "../../css/compose-tweet.scss"
import {Menu} from "antd/lib/menu";
import { Keypair } from 'stellar-base';
import WebService from "../../webservice";
import {encode,sign} from '../../transaction/index';
import {encodeText} from  '../../transaction/myv1'
import _ from 'lodash'


const FormItem = Form.Item;

class TweetForm extends Component {

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
    }

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
                    operation: 'post',
                    params: {
                        content : encodeText({
                            type: 1,
                            text: this.state.content,
                        }),
                        keys : []
                    }
                }
                sign(tx,secret);
                let data_encoding = '0x' + encode(tx).toString('hex');
                console.log(data_encoding)
                this.service.post(`api/tweet`,{tx: data_encoding}).then((response) => {
                    this.props.onCancel();
                    this.setState({
                        content:""
                    })
                }).catch(err => {
                    const message = _.get(err, 'response.data.error.message', "Tweet Unsuccess!");
                    alert(message);
                })
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="Compose new Tweet"
                centered
                visible={this.props.isTweetShow}
                onCancel={() => this.props.onCancel()}
                footer={null}
                style={{padding:0}}
            >
               <div className="modal-body">
                   <div className="tweet-box-avatar">
                       <img className="avatar"
                            src="https://pbs.twimg.com/profile_images/1068514714668290048/55vm8t9-_normal.jpg"
                            alt="Nguyễn Đình Tiến"/>
                   </div>
                   <div className="tweet-box-content">
                       <div className="tweet-content">
                           <textarea className="tweet-text-area"
                                     onChange={(e)=>this.textChange(e)}
                                     placeholder="What's happening?"
                                     name="status"></textarea>
                       </div>

                       <div className="tweet-toolbar">
                           <div className="inputfile" >
                               <label htmlFor="file">
                                   <Icon type="picture" style={{ fontSize: '24px'}}/>
                               </label>
                               <input type="file" id="file" accept="image/*" ref="fileUploader"/>
                           </div>
                           <Button type="primary"
                                   onClick={this.handleSubmit}
                                   style={{backgroundColor:"#1da1f2", borderRadius: '50px',fontWeight:'bold',float: 'right'}}>Tweet</Button>
                       </div>
                   </div>
               </div>
            </Modal>

        );
    }
}
export default Form.create()(TweetForm);
