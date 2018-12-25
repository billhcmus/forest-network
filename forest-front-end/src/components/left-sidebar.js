import React, {Component} from 'react';
import {Icon} from 'react-icons-kit';
import {calendar, coinDollar, meter, plus, user} from 'react-icons-kit/icomoon';
import moment from "moment";

const BANDWIDTH_PERIOD = 86400;
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

class LeftSidebar extends Component {
  render() {
    const bandwidthLimit = Math.ceil(this.props.userInfo.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH);
    let now = moment()
    // 24 hours window max 65kB
    let duration = moment.duration(now.diff(this.props.userInfo.bandwidthTime));
    let diff = duration.asSeconds();
    let used = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * this.props.userInfo.bandwidth)
    let oxy = bandwidthLimit - used
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
            <span> Energy: {oxy}</span>
          </div>
          <div className="bandwidthTime">
            <Icon icon={calendar} size={32}/>
            <span> Last: {this.props.userInfo.bandwidthTime.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
