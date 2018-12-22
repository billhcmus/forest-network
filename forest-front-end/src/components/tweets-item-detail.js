import React, {Component} from 'react';
import _ from 'lodash';
import {comment, thumbsOUp, heartO} from 'react-icons-kit/fa';
import {happy, angry, sad, calendar, shocked} from 'react-icons-kit/icomoon';
import "../css/detail-tweet-modal.scss"
import {Icon} from "react-icons-kit";


class TweetItemDetail extends Component {

    render() {
        const itemInfo = this.props.itemInfo;
        return (
            <div className="tweet-content">
                <img src={_.get(itemInfo,'urlAvatar')} alt="..."/>
                <div className="name">
                    <span className="displayName">{_.get(itemInfo,'displayName')}</span>
                    <div style={{display:"block"}}>
                        <span className="userName"> {_.get(itemInfo,'author')} </span>
                    </div>
                </div>

                <div className="tweet-text-container">
                    <p>{_.get(itemInfo,'content')}</p>
                </div>

                <span className="time"> 2 Dec 2018</span>

                <div className="moreStat">
                    <span className="countStat">{_.get(itemInfo,'likesCount')} Reactions</span>
                </div>

                <div className="tweet-action-footer">
                    <div className="action-item action-reply">
                        <button type="button">
                            <Icon icon={comment}/>
                            <span className="actionCount">{itemInfo.comment ? itemInfo.comment : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-like">
                        <button type="button">
                            <Icon icon={thumbsOUp}/>
                            <span className="actionCount">{itemInfo.like ? itemInfo.like : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-love">
                        <button type="button">
                            <Icon icon={heartO}/>
                            <span className="actionCount">{itemInfo.love ? itemInfo.love : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-haha">
                        <button type="button">
                            <Icon icon={happy}/>
                            <span className="actionCount">{itemInfo.haha ? itemInfo.haha : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-wow">
                        <button type="button">
                            <Icon icon={shocked}/>
                            <span className="actionCount">{itemInfo.wow ? itemInfo.wow : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-sad">
                        <button type="button">
                            <Icon icon={sad}/>
                            <span className="actionCount">{itemInfo.sad ? itemInfo.sad : 0}</span>
                        </button>
                    </div>
                    <div className="action-item action-angry">
                        <button type="button">
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
