import { Icon, Input, Button, Modal } from 'antd';
import React, {Component} from 'react';
import "../../css/compose-tweet.scss"
import {Menu} from "antd/lib/menu";

class TweetForm extends Component {
    state = {
        modalVisible: true,
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        return (
            <Modal
                title="Compose new Tweet"
                centered
                visible={this.state.modalVisible}
                onCancel={() => this.setModalVisible(false)}
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
                           <textarea className="tweet-text-area" placeholder="What's happening?" name="status"></textarea>
                       </div>

                       <div className="tweet-toolbar">
                           <div className="inputfile" >
                               <label htmlFor="file">
                                   <Icon type="picture" style={{ fontSize: '24px'}}/>
                               </label>
                               <input type="file" id="file" accept="image/*" ref="fileUploader"/>
                           </div>
                           <Button type="primary" style={{backgroundColor:"#1da1f2", borderRadius: '50px',fontWeight:'bold',float: 'right'}}>Tweet</Button>
                       </div>
                   </div>
               </div>
            </Modal>

        );
    }
}
export default TweetForm;
