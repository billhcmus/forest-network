import React, { Component } from 'react';
import FollowerItem from './followers-item';
import '../css/following.scss';

class FollowersList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-following">
        { 
          this.props.list_following.map((value, key)=>{
            return <FollowingItem key={key} FollowItem={value}/>
          })
        }
      </div>
    );
  }
}

export default FollowersList;
