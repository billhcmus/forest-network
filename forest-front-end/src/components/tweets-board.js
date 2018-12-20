import React, { Component } from 'react';
import {Icon} from 'antd/lib';
import TweetItem from './tweets-item';
import {Keypair} from "stellar-base";

class TweetBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getSomeNewestTweet(localStorage.getItem("CURRENT_USER"))
    }

    render() {
      return (
        <div className="tweets-board-container">
          <div className="heading-title">
            <div className="space-content"></div>
            <div className="title-content">
              <ul className="title-toggle">
                <li className="title-item"><a>Tweets</a></li>
                <li className="title-item"><a>Tweets & Replace</a></li>
              </ul>
            </div>
          </div>

          <div className="tweets-timeline">
            <div className="tweet-container">
              <ul className="list-tweets">
                {
                  !!this.props.tweets && this.props.tweets.map((value, key) =>{
                    return (
                      <TweetItem key={key} itemInfo={value}/>
                    )
                  })
                }
              </ul>
            </div>
          </div>
            <div className="stream-end-inner">
                <Icon type="twitter" style={{fontSize: '20px'}}/>
            </div>
        </div>
      );
    }
}

export default TweetBoard;
