import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import EditProfile from  "../containers/edit-profile"
import {create_account, getSomeNewestTweet} from "../actions";
import {Keypair} from "stellar-base";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalShow: false,
        };
    }

    handleCancelEdit =(e)=>{
        this.setState({
            isModalShow: false
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }



    handleEditClick =(e)=>{
        this.setState({
            isModalShow: true
        })
    }

    componentWillMount() {
        let secret = localStorage.getItem("SECRET_KEY");
        this.props.getCount( Keypair.fromSecret(secret).publicKey())
        // console.log(this.props)
    }
    render() {
        return (
                <div className="profile-content">
                    <EditProfile isModalShow={this.state.isModalShow} onCancel={(e)=>this.handleCancelEdit(e)}/>
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
                                                <img alt="avatar" src={`data:image/jpeg;base64,${this.props.userInfo.avatar}`}/>
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
                                            <Link className="nav-item-link" to="/">
                                                <span className="nav-item-label">Tweets</span>
                                                <span className="nav-item-value">{this.props.userInfo.tweetCount}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-list-item item-following">
                                            <Link className="nav-item-link" to="/following">
                                                <span className="nav-item-label">Following</span>
                                                <span className="nav-item-value">{this.props.userInfo.followingCount}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-list-item item-followers">
                                            <Link className="nav-item-link" to="/follower">
                                                <span className="nav-item-label">Follower</span>
                                                <span className="nav-item-value">{this.props.userInfo.followerCount}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-list-item item-button">
                                            <div className="button-edit-profile">
                                                <button type="button" className="button-edit">
                                                    <span className="button-text" onClick={(e)=>this.handleEditClick(e)}>Edit Profile</span>
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
