import {Modal} from 'antd';
import React, {Component} from 'react';
import TweetItem from "../tweets-item";
import TweetItemDetail from "../tweets-item-detail";


class ViewTweet extends Component {

    render() {
        const mainTweet = this.props.tweetDetail.mainTweet;
        const listOtherTweets = this.props.tweetDetail.otherTweets;
        return (
            <Modal
                visible={this.props.isModalShow}
                onCancel={() => this.props.onCancel()}
                footer={null}
                style={{top:20}}
                bodyStyle={{padding:0}}
            >
                <div className="tweet-container">
                    <div className="main-tweet">
                        <TweetItemDetail itemInfo={mainTweet}/>
                    </div>
                    <ul className="list-tweets">
                        {
                            !!listOtherTweets && listOtherTweets.map((value, key) =>{
                                return (
                                    <TweetItem key={key} itemInfo={value}/>
                                )
                            })
                        }
                    </ul>
                </div>
            </Modal>

        );
    }
}
export default ViewTweet;
