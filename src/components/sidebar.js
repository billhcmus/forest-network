import React, { Component } from 'react';
import moment from 'moment';

class SideBar extends Component {

  render() {
    return (
      <div className="sidebar">
      	<div className="sidebar-head">
      		<h1 className="displayName">JBThong</h1>
      		<h2 className="userName">@jb_thong</h2>
      		<div className="location">hladcll</div>
      		<div className="joined-date">{moment().format("MMM Do YY")}</div>
      		<div className="birthdate">02/10/1997</div>
      	</div>
      </div>
    );
  }
}

export default SideBar;
