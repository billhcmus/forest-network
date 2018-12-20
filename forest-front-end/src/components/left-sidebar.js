import React, {Component} from 'react';
import moment from 'moment';
import {Icon} from 'react-icons-kit';
import {calendar, coinDollar, meter, plus, user} from 'react-icons-kit/icomoon';

const BANDWIDTH_PERIOD = 86400;
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

class LeftSidebar extends Component {
  render() {
    const bandwidthLimit = Math.ceil(this.props.userInfo.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH);

    return (
      <div className="sidebar">
        <div className="sidebar-head">
          <h1 className="displayName">
            <div>{this.props.userInfo.displayName}</div>
          </h1>
          <div className="address">
            <Icon icon={user} size={32}/>
            <span> Account: {this.props.userInfo.userName}</span>
          </div>
          <div className="balance">
            <Icon icon={coinDollar} size={32}/>
            <span> Balance: {this.props.userInfo.balance}</span>
          </div>
          <div className="balance">
            <Icon icon={plus} size={32}/>
            <span> Sequence: {this.props.userInfo.sequence}</span>
          </div>
          <div className="bandwidth">
            <Icon icon={meter} size={32}/>
            <span> Oxy: {bandwidthLimit - this.props.userInfo.bandwidth}</span>
          </div>
          <div className="bandwidthTime">
            <Icon icon={calendar} size={32}/>
            <span> Last: {moment(this.props.userInfo.bandwidthTime).format('hh:mm,DD MMM, YYYY')}</span>
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
