import React, { Component } from 'react';
import _ from 'lodash';
import { Menu, Dropdown, Icon } from 'antd';

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
  }
  render() {

    const itemInfo = this.props.itemInfo

    return (
      <li className="item-tweet">
        <div className="tweet-content">
          <div className="tweet-header">
            <a className="tweet-profile-link">
              <img src="https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg" alt="..."/>
              <span className="displayName">{_.get(itemInfo,'displayName')}</span>
              <span className="usernName"> {_.get(itemInfo,'author')} </span>
              <span className="time"> 2 Dec 2018</span>
            </a>
            <div className="tweets-action">
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="down" style={{color: '#657786'}}/>
                </a>
              </Dropdown>
            </div>
          </div>

          <div className="tweet-text-container">
            <p>{_.get(itemInfo,'content')}</p>
          </div>

          <div className="tweet-action-footer">
            <div className="action-item action-reply">
              <button type="button">
                <span className="icon"><Icon type="message" /></span>
                <span className="actionCount">{_.get(itemInfo,'comments').length}</span>
              </button>
            </div>
            <div className="action-item action-like">
              <button type="button">
                <span className="icon"><Icon type="heart" /></span>
                <span className="actionCount">{_.get(itemInfo,'likesCount')}</span>
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
