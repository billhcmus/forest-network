import React, {Component} from 'react';
import {Icon} from 'react-icons-kit';
import {calendar, coinDollar, meter, plus, user} from 'react-icons-kit/icomoon';
import moment from "moment";
import {BANDWIDTH_PERIOD, CalculateOxy, MAX_CELLULOSE, NETWORK_BANDWIDTH} from "../constants";



class LeftSidebar extends Component {
  render() {
    let oxy = CalculateOxy(this.props.userInfo.balance, this.props.userInfo.bandwidthTime, this.props.userInfo.bandwidth);

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
