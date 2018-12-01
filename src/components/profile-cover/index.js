import React, { Component } from 'react';
import './index.scss'

class ProfileComponent extends Component {
  render() {
    return (
      <div>
        <div className="profile-container">
          <div className="profile-cover">
            <div className="profile-header">
              <div className="profile-header-bg">
                <img alt="Cover Photos...." src="https://pbs.twimg.com/profile_banners/173407308/1405769923/1500x500"/>
              </div>

              <div className="avatar-container">
                <div className="profile-container-avatar">
                  <div className="profile-avatar">
                    <a className="profile-picture">
                      <img alt="" src="https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-Navbar">
              <div className="navbar-container">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
