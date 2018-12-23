import React, {Component} from 'react';
import _ from 'lodash';
import {comment, thumbsOUp, heartO} from 'react-icons-kit/fa';
import {happy, angry, sad, shocked} from 'react-icons-kit/icomoon';
import "../css/detail-tweet-modal.scss"
import {Icon} from "react-icons-kit";
import {Keypair} from "stellar-base";
import moment from "moment";
import WebService from "../webservice";
import {encodeReact} from "../transaction/myv1";
import {encode, sign} from "../transaction";
import Comment from "./Modal/Comment";


class TweetItemDetail extends Component {
    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            isCommentShow:false,
        };
    }


    handleCommentCancel = (e) => {
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
        const itemInfo = this.props.itemInfo;
        const countSum = this.props.itemInfo ?
            (itemInfo.like + itemInfo.love + itemInfo.haha + itemInfo.wow + itemInfo.sad + itemInfo.angry)
            : 0
        return (
            <div className="tweet-content">
                <Comment objectid={itemInfo._id} isCommentShow={this.state.isCommentShow} onCancel={(e) => this.handleCommentCancel(e)}/>
                <img src={`data:image/jpeg;base64,${itemInfo.avatar ? itemInfo.avatar : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}`} alt="..."/>
                <div className="name">
                    <span className="displayName">{itemInfo.displayName}</span>
                    <div style={{display:"block"}}>
                        <span className="userName"> {itemInfo.author} </span>
                    </div>
                </div>

                <div className="tweet-text-container">
                    <p>{itemInfo.content.text}</p>
                </div>

                <span className="time"> {moment(itemInfo.time).format('HH:mm,DD MMM,YYYY')}</span>

                <div className="moreStat">
                    <span className="countStat">{countSum} Reactions</span>
                </div>

                <div className="tweet-action-footer">
                    <div className="action-item action-reply">
                        <button type="button" onClick={(e)=>{this.handleCommentClick(e)}}>
                            <Icon icon={comment}/>
                            <span className="actionCount">{itemInfo.comment ? itemInfo.comment : 0}</span>
                        </button>
                    </div>
                    <div className={this.props.itemInfo.currentReaction === 1
                        ?"action-item-active action-like-active":"action-item action-like"}>
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,1)}}>
                            <Icon icon={thumbsOUp}/>
                            <span className="actionCount">{itemInfo.like ? itemInfo.like : 0}</span>
                        </button>
                    </div>
                    <div className={this.props.itemInfo.currentReaction === 2
                        ?"action-item-active action-love-active":"action-item action-love"}>
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,2)}}>
                            <Icon icon={heartO}/>
                            <span className="actionCount">{itemInfo.love ? itemInfo.love : 0}</span>
                        </button>
                    </div>
                    <div className={this.props.itemInfo.currentReaction === 3
                        ?"action-item-active action-haha-active":"action-item action-haha"}>
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,3)}}>
                            <Icon icon={happy}/>
                            <span className="actionCount">{itemInfo.haha ? itemInfo.haha : 0}</span>
                        </button>
                    </div>
                    <div className={this.props.itemInfo.currentReaction === 4
                        ?"action-item-active action-wow-active":"action-item action-wow"}>
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,4)}}>
                            <Icon icon={shocked}/>
                            <span className="actionCount">{itemInfo.wow ? itemInfo.wow : 0}</span>
                        </button>
                    </div>
                    <div className={this.props.itemInfo.currentReaction === 5
                        ?"action-item action-sad-active":"action-item action-sad"}>
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,5)}}>
                            <Icon icon={sad}/>
                            <span className="actionCount">{itemInfo.sad ? itemInfo.sad : 0}</span>
                        </button>
                    </div>
                    <div className={this.props.itemInfo.currentReaction === 6
                        ?"action-item action-angry-active":"action-item action-angry"}>
                        <button type="button" onClick={(e)=>{this.handleReactClick(e,6)}}>
                            <Icon icon={angry}/>
                            <span className="actionCount">{itemInfo.angry ? itemInfo.angry : 0}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetItemDetail;
