import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import EditProfile from "../containers/edit-profile"
import {Keypair} from "stellar-base";
import {encodeFollowings} from "../transaction/myv1";
import {encode, sign} from "../transaction";
import base32 from 'base32.js';
import _ from "lodash";
import WebService from "../webservice";
import {openNotification} from "../notification";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            isModalShow: false,
        };
    }

    handleCancelEdit =(e)=>{
        this.setState({
            isModalShow: false
        })
    };

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
    };

    handleFollowClick = async (e) =>{
        let secret = localStorage.getItem("SECRET_KEY");
        let publicKey = Keypair.fromSecret(secret).publicKey();
        let seq = await this.service.get(`api/sequence/?id=${publicKey}`);
        let followings = await this.service.get(`api/followings/?id=${publicKey}&needMore=0`);
        let newfollowings = followings.data.concat(this.props.activeUser);
        let tx = {
            version: 1,
            account: '',
            sequence: seq.data + 1,
            memo: Buffer.alloc(0),
            operation: 'update_account',
            params: {
                key: 'followings',
                value: encodeFollowings({
                    addresses: newfollowings.map(user =>{
                        return Buffer.from(base32.decode(user))
                    })
                })
            }
        }
        sign(tx,secret);
        let data_encoding = '0x' + encode(tx).toString('hex');
        this.service.post(`api/users/sendTx`,{tx: data_encoding}).then((response) => {
            this.props.toggleFollow(0)
        }).catch(err => {
            const message = _.get(err, 'response.data.error.message', "Follow Unsuccess!");
            openNotification("Error",message);
        })
    };

    handleUnfollowClick = async (e) =>{
        let secret = localStorage.getItem("SECRET_KEY");
        let publicKey = Keypair.fromSecret(secret).publicKey();
        let seq = await this.service.get(`api/sequence/?id=${publicKey}`);
        let followings = await this.service.get(`api/followings/?id=${publicKey}&needMore=0`);
        let newfollowings = followings.data.filter(item=>{
            if (this.props.activeUser === item)
                return false
            return true
        });

        let tx = {
            version: 1,
            account: '',
            sequence: seq.data + 1,
            memo: Buffer.alloc(0),
            operation: 'update_account',
            params: {
                key: 'followings',
                value: encodeFollowings({
                    addresses: newfollowings.map(user=>{
                        return Buffer.from(base32.decode(user))
                    })
                })
            }
        };
        sign(tx,secret);
        let data_encoding = '0x' + encode(tx).toString('hex');

        this.service.post(`api/users/sendTx`,{tx: data_encoding}).then((response) => {
            this.props.toggleFollow(1);
        }).catch(err => {
            const message = _.get(err, 'response.data.error.message', "UnFollow Unsuccess!");
            openNotification("Error", message);
        })
    };

    //Để gọi API lại khi thay đổi activeUser mà ko bị xoay vòng
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.activeUser && nextProps.activeUser !== this.props.activeUser)
        {
            this.props.getCount(nextProps.activeUser);
            this.props.updatePeopleInfo(Keypair.fromSecret(
                localStorage.getItem("SECRET_KEY")).publicKey(),
                nextProps.activeUser);
            localStorage.setItem("ACTIVE_USER",nextProps.activeUser)//Trường hợp reload trang
        }
    }

    componentWillMount() {
        if (this.props.activeUser) {
            this.props.getCount(this.props.activeUser);
            this.props.updatePeopleInfo(Keypair.fromSecret(
                localStorage.getItem("SECRET_KEY")).publicKey(),
                this.props.activeUser);
            localStorage.setItem("ACTIVE_USER",this.props.activeUser)//Trường hợp reload trang
        }
    }

    render() {
        const specButton =
            (Keypair.fromSecret(localStorage.getItem("SECRET_KEY")).publicKey() === this.props.activeUser)
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
                                            <div className="profile-picture">
                                                <img alt="avatar" src={`data:image/jpeg;base64,${this.props.userInfo.avatar}`}/>
                                            </div>
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
