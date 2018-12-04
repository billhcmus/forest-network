import React, { Component } from 'react';
import FollowItem from './follow-item';
import '../css/follow.scss';

class FollowerList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="list-follow">
                {
                    this.props.list_follower.map((value, key)=>{
                        return <FollowItem key={key} FollowItem={value}/>
                    })
                }
            </div>
        );
    }
}

export default FollowerList;
