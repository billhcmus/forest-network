import React, {Component} from 'react';
import _ from 'lodash';
import {Dropdown, Icon, Menu} from 'antd';
import "../css/detail-tweet-modal.scss"


const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
    </Menu>
);

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
                        <Dropdown overlay={menu} trigger={['click']}>
                            <div className="tweets-action action-item action-drop">
                                <button type="button">
                                    <span className="icon "> <Icon type="down" style={{fontSize: '14px'}}/></span>
                                </button>
                            </div>
                        </Dropdown>
                    </div>
                </div>

                <div className="tweet-text-container">
                    <p>{_.get(itemInfo,'content')}</p>
                </div>

                <span className="time"> 2 Dec 2018</span>

                <div className="moreStat">
                    <span className="countStat">{_.get(itemInfo,'commentCount')} Retweet</span>
                    <span className="countStat">{_.get(itemInfo,'likesCount')} Likes</span>
                </div>

                <div className="tweet-action-footer">
                    <div className="action-item action-reply">
                        <button type="button">
                            <span className="icon"><Icon type="message" /></span>
                            <span className="actionCount">{_.get(itemInfo,'commentCount')}</span>
                        </button>
                    </div>
                    <div className="action-item action-like">
                        <button type="button">
                            <span className="icon"><Icon type="heart" /></span>
                            <span className="actionCount">{_.get(itemInfo,'likesCount')}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetItemDetail;
