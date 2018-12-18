import React, { Component } from 'react';
import moment from 'moment';
import { Icon } from 'react-icons-kit';
import {location,calendar,droplet,coinDollar,meter,user} from 'react-icons-kit/icomoon';

class LeftSidebar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-head">
          <h1 className="displayName">
            <a>{this.props.userInfo.displayName}</a>
          </h1>
          <div className="address">
            <Icon icon={user} size={32}/>
            <span> {this.props.userInfo.userName}</span>
          </div>
          <div className="balance">
            <Icon icon={coinDollar} size={32}/>
            <span> {this.props.userInfo.balance}</span>
          </div>
          <div className="bandwidth">
            <Icon icon={meter} size={32}/>
            <span> {this.props.userInfo.bandwidth}</span>
          </div>
          <div className="bandwidthTime">
            <Icon icon={calendar} size={32}/>
            <span> {moment(this.props.userInfo.bandwidthTime).format('hh:mm,DD MMM, YYYY')}</span>
          </div>
          {/*<div className="location">*/}
            {/*<Icon icon={location}/>*/}
            {/*<span> {this.props.userInfo.location}</span>*/}
          {/*</div>*/}
          {/*<div className="birthdate">*/}
            {/*<Icon icon={droplet}/>*/}
            {/*<span> {moment(this.props.userInfo.birthdate).format('MMM DD, YYYY')}</span>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
