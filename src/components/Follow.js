import React, {Component} from 'react';
import _ from 'lodash';

export default class Follow extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className={'follow'}>
                <h3 className="follow-title">
                    Who to follow
                    <small><a href="#">Refresh</a> ● <a href="#">View all</a></small>
                </h3>
                <div className={'recommend-follower'}>
                    {
                        this.props.recommendList.map((value, key) => {
                            return (
                                <div key={key} className="user-item">
                                    <div className="media">
                                        <div className="media-left">
                                            <img src={_.get(value, "avatar")} alt="avatar"/>
                                        </div>
                                        <div className="media-body">
                                            <h4 className="media-heading">{_.get(value, "displayName")}</h4>
                                            <button type="button" className="btn btn-outline-primary">Follow</button>
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