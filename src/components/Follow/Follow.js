import React, {Component} from 'react';
import './follow-style.scss'
import _ from 'lodash';

export default class Follow extends Component {

    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleFollowClick = this.handleFollowClick.bind(this);
    }

    handleItemClick(username) {
        this.props.dismissUserRecommend(username)
    }

    handleFollowClick(username) {
        this.props.increaseFollowing();
        this.props.dismissUserRecommend(username)
    }

    render() {
        return (
            <div className={'follow'}>
                <h3 className="follow-title">
                    Who to follow
                    <small> <span>&#183;</span> <a href="#">Refresh</a> <span>&#183;</span> <a href="#">View all</a></small>
                </h3>
                <div className={'recommend-follower'}>
                    {
                        this.props.recommendList.valueSeq().map((value, key) => {
                            return (
                                <div key={key} className="user-item">
                                    <div className="media">
                                        <div className="media-left">
                                            <img src={_.get(value, "avatar")} alt="avatar"/>
                                        </div>
                                        <div className="media-body">
                                            <h4 className="media-heading">{_.get(value, "displayName")}</h4>
                                            <button type="button" className="btn btn-outline-primary" onClick={() => this.handleFollowClick(_.get(value, "userName"))}>Follow</button>
                                        </div>
                                        <div className={"dismiss"}>
                                            <button type="button" className="close" aria-label="Close" onClick={() => this.handleItemClick(_.get(value, "userName"))}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}