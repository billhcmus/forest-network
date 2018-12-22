import React, {Component} from 'react';
import {Icon} from 'react-icons-kit';
import {comment, thumbsOUp, heartO} from 'react-icons-kit/fa';
import {happy, angry, sad, calendar,shocked} from 'react-icons-kit/icomoon';
import ViewTweet from '../containers/view-detail-tweet';
import Comment from '../components/Modal/Comment';
import moment from "moment";
import {Keypair} from "stellar-base";
import {encodeReact} from "../transaction/myv1";
import {encode, sign} from "../transaction";
import _ from "lodash";
import WebService from "../webservice";
// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
//     </Menu.Item>
//   </Menu>
// );


class TweetItem extends Component {

    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            isModalShow: false,
            isCommentShow:false,
        };
    }

    handleCacel = (e) => {
        this.setState({
            isModalShow: false
        })
    }

    handleCommentCacel = (e) => {
        this.setState({
            isCommentShow: false
        })
    }

    handleCommentClick = (e) => {
        e.stopPropagation()
        this.setState({
            isCommentShow: true
        })
    }


    handleSpanClick = (e) => {
        e.stopPropagation()
        this.setState({
            isModalShow: true
        })
    }

    sendInteract = (type,isTurnOn) => {
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
                    object:this.props.itemInfo._id,
                    content : encodeReact({
                        type: 2,
                        reaction: isTurnOn ? type : 0,
                    }),
                }
            }
            sign(tx,secret);
            let data_encoding = '0x' + encode(tx).toString('hex');
            this.service.post(`api/sendTx`,{tx: data_encoding}).then((response) => {
                this.props.onCancel();
                alert('Successs');
            }).catch(err => {
                const message = _.get(err, 'response.data.error.message', "React Unsuccess!");
                alert(message);
            })
        })
    }

    handleReactClick = (e,type) =>{
        if (this.props.itemInfo.currentReaction === type){
            this.sendInteract(type,false)
        }
        else
            this.sendInteract(type,true)
    }

    render() {
        const itemInfo = this.props.itemInfo
        return (
            <li className="item-tweet">
                <ViewTweet isModalShow={this.state.isModalShow} onCancel={(e) => this.handleCacel(e)}/>
                <Comment object={itemInfo._id} isCommentShow={this.state.isCommentShow} onCancel={(e) => this.handleCommentCacel(e)}/>

                <div className="tweet-content" onClick={(e) =>this.handleSpanClick(e)}>
                    <div className="tweet-header">
                        <div className="tweet-profile-link">
                            <img
                                src={`data:image/jpeg;base64,${itemInfo.avatar ? itemInfo.avatar : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}`}
                                alt="..."/>
                            <span
                                className="displayName">{itemInfo.displayName ? itemInfo.displayName : 'Unknown'}</span>
                            <span className="time"> {moment(itemInfo.time).format('HH:mm,DD MMM,YYYY')}</span>
                            <span className="userName"> {itemInfo.author} </span>
                        </div>
                        {/*<Dropdown overlay={menu} trigger={['click']}>*/}
                        {/*<div className="tweets-action action-item action-drop">*/}
                        {/*<button type="button">*/}
                        {/*<span className="icon "> <Icon type="down" style={{fontSize: '14px'}}/></span>*/}
                        {/*</button>*/}
                        {/*</div>*/}
                        {/*</Dropdown>*/}
                    </div>

                    <div className="tweet-text-container">
                        <p>{itemInfo.content.text}</p>
                    </div>
                </div>
                <div className="tweet-action-footer">
                    <div className="action-item action-reply">
                        <button type="button" onClick={(e)=>{this.handleCommentClick(e)}}>
                            <Icon icon={comment}/>
                            <span className="actionCount">{itemInfo.comment ? itemInfo.comment : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-like">
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,1)}}>
                            <Icon icon={thumbsOUp}/>
                            <span className="actionCount">{itemInfo.like ? itemInfo.like : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-love">
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,2)}}>
                            <Icon icon={heartO}/>
                            <span className="actionCount">{itemInfo.love ? itemInfo.love : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-haha">
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,3)}}>
                            <Icon icon={happy}/>
                            <span className="actionCount">{itemInfo.haha ? itemInfo.haha : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-wow">
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,4)}}>
                            <Icon icon={shocked}/>
                            <span className="actionCount">{itemInfo.wow ? itemInfo.wow : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-sad">
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,5)}}>
                            <Icon icon={sad}/>
                            <span className="actionCount">{itemInfo.sad ? itemInfo.sad : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-angry">
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,6)}}>
                            <Icon icon={angry}/>
                            <span className="actionCount">{itemInfo.angry ? itemInfo.angry : 0}</span>
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}

export default TweetItem;
