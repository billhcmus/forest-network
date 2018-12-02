import React, { Component } from 'react';

class TweetItem extends Component {

  constructor(props) {
      super(props);
  }
  render() {

    const itemInfo = this.props;
    console.log(itemInfo)

    return (
      <li className="item-tweet">
        <div className="tweet-content">
          <div className="tweet-header">
            <a className="tweet-profile-link">
              <img src="https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg" alt="..."/>
              <span className="displayName">JBThong</span>
              <span className="usernName">@jb_thong</span>
              <span className="time">{new Date().toString()}</span>
            </a>
            <div className="tweets-action">
              <div className="dropdown">
                <button type="button"></button>
                <div className="dropdown-menu"></div>
              </div>
            </div>
          </div>

          <div className="tweet-text-container">
            <p>adadaldlallalall</p>
          </div>

          <div className="tweet-actionList">
            <div className="">
              <button type="button">
                <span className="icon"></span>
                <span className="actionCount">1</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default TweetItem;
