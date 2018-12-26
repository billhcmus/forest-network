import React, {Component} from 'react';
import {Icon} from 'react-icons-kit';
import {commentingO} from 'react-icons-kit/fa';
import ViewTweet from '../containers/view-detail-tweet';
import Comment from '../components/Modal/Comment';
import moment from "moment";
import {Keypair} from "stellar-base";
import WebService from "../webservice";
import ReactionPanel from "./Modal/reaction-panel"


class NewFeedItem extends Component {

    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            isModalShow: false,
            isCommentShow:false,
        };
    }

    handleCancel = (e) => {
        this.setState({
            isModalShow: false
        })
    }

    handleCommentCancel = (e) => {
        this.setState({
            isCommentShow: false
        })
    }

    // handleCommentClick = (e) => {
    //     e.stopPropagation()
    //     this.setState({
    //         isCommentShow: true
    //     })
    // }

    // handleSpanClick = (e) => {
    //     e.stopPropagation()
    //     this.setState({
    //         isModalShow: true
    //     })
    //     this.props.getDetailTweet(this.props.itemInfo,Keypair.fromSecret(
    //         localStorage.getItem("SECRET_KEY")).publicKey())
    // }

    render() {
        console.log(this.props.itemInfo)
        const itemInfo = this.props.itemInfo
        const countSum = this.props.itemInfo ?
            (itemInfo.like + itemInfo.love + itemInfo.haha + itemInfo.wow + itemInfo.sad + itemInfo.angry)
            : 0
        return (
            <div>
                <ViewTweet isModalShow={this.state.isModalShow} onCancel={(e) => this.handleCancel(e)}/>
                <Comment objectid={itemInfo._id} isCommentShow={this.state.isCommentShow} onCancel={(e) => this.handleCommentCancel(e)}/>
                <li className="item-tweet" onClick={(e) =>this.handleSpanClick(e)}>
                    <div className="tweet-content">
                        <div className="tweet-header">
                            <div className="tweet-profile-link">
                                <img
                                    src={`data:image/jpeg;base64,${itemInfo.avatar ? itemInfo.avatar : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}`}
                                    alt="..."/>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (this.props.activeUser !== itemInfo.author)
                                            window.location =`/${itemInfo.author}`
                                    }}
                                    className="displayName">{itemInfo.displayName ? itemInfo.displayName : 'Unknown'}</span>
                                <span className="time"> {moment(itemInfo.time).format('HH:mm, DD MMM, YYYY')}</span>
                                <span className="userName"> {itemInfo.author} </span>
                            </div>
                        </div>

                        <div className="tweet-text-container">
                        </div>
                    </div>

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
                                <div className="action-item">
                                    <div className="reaction-icon-small like"></div>
                                    <span className="actionCount">{itemInfo.like}</span>
                                </div>
                                : <div></div>
                        }
                        {
                            itemInfo.love > 0 ?
                                <div className="action-item">
                                    <div className="reaction-icon-small love"></div>
                                    <span className="actionCount">{itemInfo.love}</span>
                                </div>
                                : <div></div>
                        }
                        {
                            itemInfo.haha > 0 ?
                                <div className="action-item">
                                    <div className="reaction-icon-small haha"></div>
                                    <span className="actionCount">{itemInfo.haha}</span>
                                </div>
                                : <div></div>
                        }
                        {
                            itemInfo.wow > 0 ?
                                <div className="action-item">
                                    <div className="reaction-icon-small wow"></div>
                                    <span className="actionCount">{itemInfo.wow}</span>
                                </div>
                                : <div></div>
                        }
                        {
                            itemInfo.sad > 0 ?
                                <div className="action-item">
                                    <div className="reaction-icon-small sad"></div>
                                    <span className="actionCount">{itemInfo.sad}</span>
                                </div>
                                : <div></div>
                        }
                        {
                            itemInfo.angry > 0 ?
                                <div className="action-item">
                                    <div className="reaction-icon-small angry"></div>
                                    <span className="actionCount">{itemInfo.angry}</span>
                                </div>
                                : <div></div>
                        }
                    </div>
                </li>
            </div>
        );
    }
}

export default NewFeedItem;
