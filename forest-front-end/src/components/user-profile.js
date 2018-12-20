import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import EditProfile from  "../containers/edit-profile"
import {Keypair} from "stellar-base";
import {encodeFollowings} from "../transaction/myv1";
import {encode, sign} from "../transaction";
import base32 from 'base32.js';
import _ from "lodash";
import WebService from "../webservice";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            isModalShow: false,
            isFollow: false
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
    handleFollowClick = async (e) =>{
        let secret = localStorage.getItem("SECRET_KEY");
        let publicKey = Keypair.fromSecret(secret).publicKey();
        let seq = await this.service.get(`api/sequence/?id=${publicKey}`);
        let followings = await this.service.get(`api/followings/?id=${publicKey}`);
        let tx = {
            version: 1,
            account: '',
            sequence: seq.data + 1,
            memo: Buffer.alloc(0),
            operation: 'update_account',
            params: {
                key: 'followings',
                value: encodeFollowings({
                    addresses: followings.data.map(user=>{
                        return Buffer.from(base32.decode)
                    }).concat(Buffer.from(base32.decode(this.props.curentId)))
                })
            }
        }
        sign(tx,secret);
        let data_encoding = '0x' + encode(tx).toString('hex');

        this.service.post(`api/sendTx`,{tx: data_encoding}).then((response) => {
        }).catch(err => {
            const message = _.get(err, 'response.data.error.message', "Follow Unsuccess!");
            alert(message);
        })
    }

    handleUnfollowClick = async (e) =>{
        let secret = localStorage.getItem("SECRET_KEY");
        let publicKey = Keypair.fromSecret(secret).publicKey();
        let seq = await this.service.get(`api/sequence/?id=${publicKey}`);
        let followings = await this.service.get(`api/followings/?id=${publicKey}`);
        let addbase32 = Buffer.from(base32.decode(this.props.curentId));
        let tx = {
            version: 1,
            account: '',
            sequence: seq.data + 1,
            memo: Buffer.alloc(0),
            operation: 'update_account',
            params: {
                key: 'followings',
                value: encodeFollowings({
                    addresses: followings.data.map(user=>{
                        return Buffer.from(base32.decode)
                    }).filter(item=>{
                        if (addbase32 === item)
                            return false
                        return true
                    })
                })
            }
        }
        sign(tx,secret);
        let data_encoding = '0x' + encode(tx).toString('hex');

        this.service.post(`api/sendTx`,{tx: data_encoding}).then((response) => {
        }).catch(err => {
            const message = _.get(err, 'response.data.error.message', "Follow Unsuccess!");
            alert(message);
        })
    }

    componentWillMount() {
        this.props.getCount(localStorage.getItem("CURRENT_USER"))
        this.props.updatePeopleInfo(Keypair.fromSecret(
            localStorage.getItem("SECRET_KEY")).publicKey(),
            localStorage.getItem("CURRENT_USER"))
    }
    render() {
        let secret = localStorage.getItem("SECRET_KEY");
        const specButton =  (Keypair.fromSecret(localStorage.getItem("SECRET_KEY")).publicKey() === localStorage.getItem("CURRENT_USER"))
        ? <span className="button-text" onClick={(e)=>this.handleEditClick(e)}>Edit Profile</span>
            :  (this.props.userInfo.hasFollow === 0)
                ?  <span className="button-text" onClick={(e)=>this.handleFollowClick(e)}>Follow</span>
                    :   <span className="button-text" onClick={(e)=>this.handleUnfollowClick(e)}>Unfollow</span>


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
                                        <li className="nav-list-item item-tweets">
                                            <Link className="nav-item-link" to={"/tweets"}  param={{id: localStorage.getItem("CURRENT_USER")}}>
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
                                                   {specButton}
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
