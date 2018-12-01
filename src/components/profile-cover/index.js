import React, { Component } from 'react';
import './index.scss'

class ProfileComponent extends Component {
  render() {
    return (
      <div className="profile-content">
        <div className="profile-container">
          <div className="profile-cover">
            <div className="profile-header">
              <div className="profile-header-bg">
                <img alt="Cover Photos...." src="https://pbs.twimg.com/profile_banners/173407308/1405769923/1500x500"/>
              </div>

              <div className="avatar-container">
                <div className="profile-container-avatar">
                  <div className="profile-avatar">
                    <a href="#" className="profile-picture">
                      <img alt="" src="https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-Navbar">
              <div className="navbar-container">
                <div className="profile-Nav">
                  <ul className="nav-list">
                    <li className="nav-list-item first-item-blance">
                    </li>
                    <li className="nav-list-item item-tweets">
                      <a className="nav-item-link">
                        <span className="nav-item-label">Tweets</span>
                        <span className="nav-item-value">1111</span>
                      </a>
                    </li>
                    <li className="nav-list-item item-following">
                      <a className="nav-item-link">
                        <span className="nav-item-label">Following</span>
                        <span className="nav-item-value">1111</span>
                      </a>
                    </li>
                    <li className="nav-list-item item-followers">
                      <a className="nav-item-link">
                        <span className="nav-item-label">Follers</span>
                        <span className="nav-item-value">1111</span>
                      </a>
                    </li>
                    <li className="nav-list-item item-button">
                      <div className="button-edit-profile">
                        <button type="button" className="button-edit">
                          <span className="button-text">Edit Profile</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
