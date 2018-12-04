import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className="profile-content">
                <div className="profile-container">
                    <div className="profile-cover">
                        <div className="profile-header">
                            <div className="profile-header-bg">
                                <img alt="Cover Photos...." src={this.props.userInfo.theme}/>
                            </div>

                            <div className="avatar-container">
                                <div className="profile-container-avatar">
                                    <div className="profile-avatar">
                                        <a href="#" className="profile-picture">
                                            <img alt="avatar" src={this.props.userInfo.avartar}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-Navbar">
                            <div className="navbar-container">
                                <div className="profile-Nav">
                                    <ul className="nav-list">
                                        <li className="first-item-blance">
                                        </li>
                                        <li className="nav-list-item item-tweets isSelected">
                                            <Link className="nav-item-link" to="/" activeClassName="isSelected">
                                                <span className="nav-item-label">Tweets</span>
                                                <span className="nav-item-value">{this.props.userInfo.other.tweetCount}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-list-item item-following">
                                            <Link className="nav-item-link" to="/following">
                                                <span className="nav-item-label">Following</span>
                                                <span className="nav-item-value">{this.props.userInfo.other.followingCount}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-list-item item-followers">
                                            <a className="nav-item-link">
                                                <span className="nav-item-label">Follower</span>
                                                <span className="nav-item-value">{this.props.userInfo.other.followerCount}</span>
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

export default UserProfile;
