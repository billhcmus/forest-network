import React, {Component} from 'react';
import FollowItem from './following-item';
import '../css/follow.scss';
import {Keypair} from "stellar-base";

class FollowingList extends Component {

  componentWillMount(){
    this.props.updateListFollowing(this.props.activeUser)
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('scrollfollowing');
    if (this.isBottom(wrappedElement)) {
      if (this.props.list_following.length > 0) {
        this.props.addListFollowing(this.props.activeUser,this.props.list_following.length)
      }
    }
  };

  render() {
    return (
      <div className="list-follow" id ="scrollfollowing" ref={(el) => { this.screen = el; }}>
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
