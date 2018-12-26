import React, {Component} from 'react';
import _ from 'lodash';
import {commentingO} from 'react-icons-kit/fa';
import "../css/detail-tweet-modal.scss"
import {Icon} from "react-icons-kit";
import {Keypair} from "stellar-base";
import moment from "moment";
import WebService from "../webservice";
import {encodeReact} from "../transaction/myv1";
import {encode, sign} from "../transaction";
import Comment from "./Modal/Comment";
import ReactionPanel from "./Modal/reaction-panel";
import {openNotification} from "../notification";


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
            };
            sign(tx,secret);
            let data_encoding = '0x' + encode(tx).toString('hex');
            this.service.post(`api/users/sendTx`,{tx: data_encoding}).then((response) => {

            }).catch(err => {
                const message = _.get(err, 'response.data.error.message', "React Unsuccess!");
                openNotification("Error", message);
            })
        })
    };

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
                    <span
                        onClick={(e) => {
                            e.stopPropagation()
                            if (this.props.activeUser !== itemInfo.author)
                                window.location =`/${itemInfo.author}`
                        }}
                        className="displayName">{itemInfo.displayName}</span>
                    <div style={{display:"block"}}>
                        <span className="userName"> {itemInfo.author} </span>
                    </div>
                </div>

                <div className="tweet-text-container">
                    <p>{itemInfo.content.text}</p>
                </div>

                <span className="time"> {moment(itemInfo.time).format('HH:mm, DD MMM, YYYY')}</span>

                <div className="moreStat">
                    <span className="countStat"><strong>{countSum}</strong> Reactions</span>
                    <span className="countStat"><strong>{itemInfo.comment}</strong> Comments</span>
                </div>

                <div className="tweet-action-footer">
                    <ReactionPanel itemInfo={itemInfo}/>
                    <div className="comment-btn" onClick={(e)=>{this.handleCommentClick(e)}}>
                        <span><Icon icon={commentingO}/> Comment</span>
                    </div>
                    {
                        itemInfo.like > 0 ?
                            <div className="action-item" title={
                                itemInfo.likeList.toString()
                            }>
                                <div className="reaction-icon-small like"></div>
                                <span className="actionCount">{itemInfo.like}</span>
                            </div>
                            : <div></div>
                    }
                    {
                        itemInfo.love > 0 ?
                            <div className="action-item"title={
                                itemInfo.loveList.toString()
                            }>
                                <div className="reaction-icon-small love"></div>
                                <span className="actionCount">{itemInfo.love}</span>
                            </div>
                            : <div></div>
                    }
                    {
                        itemInfo.haha > 0 ?
                            <div className="action-item"title={
                                itemInfo.hahaList.toString()
                            }>
                                <div className="reaction-icon-small haha"></div>
                                <span className="actionCount">{itemInfo.haha}</span>
                            </div>
                            : <div></div>
                    }
                    {
                        itemInfo.wow > 0 ?
                            <div className="action-item"title={
                                itemInfo.wowList.toString()
                            }>
                                <div className="reaction-icon-small wow"></div>
                                <span className="actionCount">{itemInfo.wow}</span>
                            </div>
                            : <div></div>
                    }
                    {
                        itemInfo.sad > 0 ?
                            <div className="action-item"title={
                                itemInfo.sadList.toString()
                            }>
                                <div className="reaction-icon-small sad"></div>
                                <span className="actionCount">{itemInfo.sad}</span>
                            </div>
                            : <div></div>
                    }
                    {
                        itemInfo.angry > 0 ?
                            <div className="action-item"title={
                                itemInfo.angryList.toString()
                            }>
                                <div className="reaction-icon-small angry"></div>
                                <span className="actionCount">{itemInfo.angry}</span>
                            </div>
                            : <div></div>
                    }
                </div>
            </div>
        );
    }
}

export default TweetItemDetail;
