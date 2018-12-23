import {Modal} from 'antd';
import React, {Component} from 'react';
import TweetItem from "../../containers/tweet-item";
import TweetItemDetail from "../tweets-item-detail";


class ViewTweet extends Component {
    render() {
        const mainTweet = this.props.tweetDetail.main;
        const listComments = this.props.tweetDetail.comments;
        return (
            <Modal
                visible={this.props.isModalShow}
                onCancel={() => this.props.onCancel()}
                footer={null}
                style={{top:20}}
                width = {700}
                bodyStyle={{padding:0}}
            >
                <div className="tweet-container">
                    <div className="main-tweet">
                        <TweetItemDetail itemInfo={mainTweet}/>
                    </div>
                    <ul className="list-tweets">
                        {
                            !!listComments && listComments.map((value, key) =>{
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