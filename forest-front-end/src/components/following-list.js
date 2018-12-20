import React, {Component} from 'react';
import FollowItem from './following-item';
import '../css/follow.scss';

class FollowingList extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.updateListFollowing(this.props.currentUserID)
  }

  render() {

    console.log(this.props.list_following)
    return (
      <div className="list-follow">
        { 
          this.props.list_following.map((value, key)=>{
            return <FollowItem key={key} FollowItem={value}/>
          })
        }
      </div>
    );
  }
}

export default FollowingList;
