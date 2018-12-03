import React, { Component } from 'react';
import FollowingItem from './following-item';
import '../css/following.scss';

class FollowingList extends Component {

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

export default FollowingList;
