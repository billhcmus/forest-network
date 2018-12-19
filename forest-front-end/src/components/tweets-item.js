import React, { Component } from 'react';
import _ from 'lodash';
import { Menu, Dropdown, Icon } from 'antd';
import ViewTweet from '../containers/view-detail-tweet';
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


class TweetItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalShow: false,
        };
    }

    handleCacel =(e)=>{
        this.setState({
            isModalShow: false
        })
    }


    handleSpanClick =(e)=>{
        this.setState({
            isModalShow: true
        })
    }

      render() {
        const itemInfo = this.props.itemInfo
        return (
          <li className="item-tweet">
              <ViewTweet isModalShow={this.state.isModalShow} onCancel={(e)=>this.handleCacel(e)}/>
            <div className="tweet-content" onClick={(e)=>this.handleSpanClick(e)}>
              <div className="tweet-header">
                <a className="tweet-profile-link">
                  <img src={itemInfo.avatar} alt="..."/>
                  <span className="displayName">{itemInfo.name ? itemInfo.name : 'Unknown'}</span>
                  <span className="userName"> {itemInfo.author} </span>
                  <span className="time"> 2 Dec 2018</span>
                </a>
                  <Dropdown overlay={menu} trigger={['click']}>
                      <div className="tweets-action action-item action-drop">
                          <button type="button">
                              <span className="icon "> <Icon type="down" style={{fontSize: '14px'}}/></span>
                          </button>
                      </div>
                  </Dropdown>
              </div>

              <div className="tweet-text-container">
                <p>{itemInfo.content.text}</p>
              </div>

              <div className="tweet-action-footer">
                <div className="action-item action-reply">
                  <button type="button">
                    <span className="icon"><Icon type="message" /></span>
                    <span className="actionCount">{itemInfo.commentCount ? itemInfo.commentCount : 0}</span>
                  </button>
                </div>
                <div className="action-item action-like">
                  <button type="button">
                    <span className="icon"><Icon type="heart" /></span>
                    <span className="actionCount">{itemInfo.likesCount ? itemInfo.likesCount : 0}</span>
                  </button>
                </div>
              </div>

               <a style={{color:'#1DA1F2',textAlign:'left'}}>Show this
                  thread</a>
            </div>
          </li>
        );
      }
}

export default TweetItem;
