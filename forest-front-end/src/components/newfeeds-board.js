import React, {Component} from 'react';
import {Icon} from 'antd';
import NewFeedItem from '../containers/newfeeds-item';
import {Keypair} from "stellar-base";

class NewFeedsBoard extends Component {
    componentWillMount() {
        this.props.getNews(Keypair.fromSecret(
            localStorage.getItem("SECRET_KEY")).publicKey(), 0, 5)
        this.props.updatePeopleInfo(Keypair.fromSecret(
                    localStorage.getItem("SECRET_KEY")).publicKey(), Keypair.fromSecret(
                    localStorage.getItem("SECRET_KEY")).publicKey())
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('a-scroll');
        if (this.isBottom(wrappedElement)) {
            console.log('Loadmore');
            if (this.props.newfeeds.length > 0) {
                this.props.getNewsMore(Keypair.fromSecret(
                    localStorage.getItem("SECRET_KEY")).publicKey(), this.props.newfeeds.length)
            }
        }
    };

    render() {
      return (
        <div className="tweets-board-container"  id ="a-scroll" ref={(el) => { this.screen = el; }}>
          <div className="heading-title">
            <div className="space-content"></div>
            {/*<div className="title-content">*/}
              {/*<ul className="title-toggle">*/}
                {/*<li className="title-item">Tweets</li>*/}
                {/*<li className="title-item">Tweets & Replace</li>*/}
              {/*</ul>*/}
            {/*</div>*/}
          </div>

          <div className="tweets-timeline">
            <div className="tweet-container">
              <ul className="list-tweets">
                {
                  !!this.props.newfeeds && this.props.newfeeds.map((value, key) =>{
                    return (
                      <NewFeedItem key={key} itemInfo={value}/>
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

export default NewFeedsBoard;
