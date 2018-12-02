import React, { Component } from 'react';
import TweetItem from './tweets-item';
import './tweets.scss'

class TweetBoard extends Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     console.log(this.props.tweets.listTweet)
    // }

    render() {
      const listTweet = this.props.tweets.listTweet;
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
                  !!listTweet && listTweet.map((value, key) =>{
                    return (
                      <TweetItem key={key}/>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      );
    }
}

export default TweetBoard;
