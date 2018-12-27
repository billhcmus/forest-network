import {Modal} from 'antd';
import React, {Component} from 'react';
import TweetItem from "../../containers/tweet-item";
import NewFeedItemDetail from "../newfeed-item-detail";
import {Keypair} from "stellar-base";


class ViewNew extends Component {


    // handleViewMoreComment = () => {
    //         console.log('Loadmorecomment');
    //         if (this.props.tweetDetail.comments.length > 0) {
    //             this.props.getMoreDetailTweet(this.props.tweetDetail.main, Keypair.fromSecret(
    //                 localStorage.getItem("SECRET_KEY")).publicKey(), this.props.tweetDetail.comments.length)
    //         }
    // };

    render() {
        const mainTweet = this.props.newfeedDetail.main;
        const listComments = this.props.newfeedDetail.comments;
        return (
                <Modal
                    title={`Post ${mainTweet ? "of " + mainTweet.displayName : ""}`}
                    visible={this.props.isModalShow}
                    onCancel={() => this.props.onCancel()}
                    footer={null}
                    style={{top:20}}
                    width = {700}
                    bodyStyle={{padding:0}}
                >
                    <div className="tweet-container">
                        <div className="main-tweet">
                            <NewFeedItemDetail activeUser={this.props.activeUser} itemInfo={mainTweet}/>
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
                        <div className="view-more" onClick={(e)=>this.handleViewMoreComment(e)}>Xem thêm...</div>
                    </div>
                </Modal>
        );
    }
}
export default ViewNew;