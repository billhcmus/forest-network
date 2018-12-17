import { Form, Icon, Input, Button, Modal } from 'antd';
import React, {Component} from 'react';
import "../../css/compose-tweet.scss"
import {Menu} from "antd/lib/menu";
import { Keypair } from 'stellar-base';
import WebService from "../../webservice";
import {encode,sign} from '../../transaction';


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
        console.log(this.state.content)
        if (this.state.content.length !== 0) {
            const secret ="SAN4YZ62PPL5YPWZVYFEN3D3MM64FHUVN536NCIOBZE6YUCGHWZXL5QB";
            const key = Keypair.fromSecret(secret);
            this.service.get(`api/sequence/?id=${key.publicKey()}`).then(seq =>{
                let tx = {
                    version: 1,
                    account: '',
                    sequence: seq + 1,
                    memo: Buffer.alloc(0),
                    operation: 'post',
                    params: {
                        content: {
                            type: 1,
                            text: this.state.content
                        }, keys: []},
                }
                sign(tx, secret)
                let data_encoding = '0x'+encode(tx).toString('hex');
                this.service.post(`/api/tweet`,{tx: data_encoding});
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="Compose new Tweet"
                centered
                visible={this.props.isModalShow}
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
