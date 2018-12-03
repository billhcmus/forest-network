import React, { Component } from 'react';
import FollowingItem from './following-item';
import '../css/following.scss';

class FollowingList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list">
        <FollowingItem/>
      </div>
    );
  }
}

export default FollowingList;
