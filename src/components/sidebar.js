import React, { Component } from 'react';
import moment from 'moment';
import { Icon } from 'react-icons-kit';
import {location} from 'react-icons-kit/icomoon/location';
import {calendar} from 'react-icons-kit/icomoon/calendar';
import {droplet} from 'react-icons-kit/icomoon/droplet'

class SideBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.userInfo)
    return (
      <div className="sidebar">
        <div className="sidebar-head">
          <h1 className="displayName">
            <a>{this.props.userInfo.displayName}</a>
          </h1>
          <h2 className="userName">@ <span>{this.props.userInfo.userName}</span></h2>
          <div className="location">
            <Icon icon={location}/>
            <span> {this.props.userInfo.location}</span>
          </div>
          <div className="joined-date">
            <Icon icon={calendar}/>
            <span> Joined {moment(this.props.userInfo.joinTime).format('MMM DD, YYYY')}</span>
          </div>
          <div className="birthdate">
            <Icon icon={droplet}/>
            <span> Born {moment(this.props.userInfo.birthdate).format('MMM DD, YYYY')}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
