import React, {Component} from 'react';
import { Icon,Input } from 'antd';
import '../../css/edit-profile.scss'
import moment from "moment";
import { Keypair } from 'stellar-base';
import WebService from "../../webservice";
import {encode,sign} from '../../transaction';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // avatar:this.props.userInfo.avatar,
            // theme:this.props.userInfo.theme,
            userName:this.props.userInfo.displayName,
            location:this.props.userInfo.location,
            birthday:moment(this.props.userInfo.birthdate).format('MMM DD, YYYY'),
        };
    }

    saveDetail() {
        console.log(this.state.userName)
        console.log("saveDetail")


        
            // const secret = localStorage.getItem("token");
            let secretKey = "SBPESDLGQCJ2FK63GEXULOBCABLSKW4MK6X7O2463DIMH2FX6AFPPFPS"
            const key = Keypair.fromSecret(secretKey);
            this.service.get(`api/sequence/?id=${key.publicKey()}`).then(seq =>{
                let tx = {
                    version: 1,
                    account: key.publicKey(),
                    sequence: seq + 1,
                    memo: Buffer.alloc(0),
                    operation: 'update_account',
                    params: {
                        key: 'name',
                        value: {
                            type: Buffer,
                            data: 'this.state.userName'
                        },
                    }
                }
                console.log(tx)
                sign(tx, secretKey)
                let data_encoding = '0x'+encode(tx).toString('hex');
                // this.service.post(`/api/tweet`,{tx: data_encoding});
            })
        // this.props.updateDetail(this.state);
        // this.props.onCancel();
    }

    render() {
        if (this.props.isModalShow === true) {
            return (
                <div>
                    <div className="cover-edit">
                    </div>
                    <div className="overlay-edit">
                    </div>
                    <div className="edit-profile-container">
                        <div className="profile-edit-image">
                            <label htmlFor="fileTheme">
                                <span style={{position: 'relative',bottom: '-200px'}}>
                                    <Icon type="picture" style={{ fontSize: '40px'}}/>
                                    <p>Change your header photo</p>
                                </span>
                            </label>
                            <input type="file" id="fileTheme" accept="image/*" ref="fileUploader"/>
                        </div>

                        <div className="profile-edit-avatar">
                            <div className="profile-container-avatar">
                                <div className="profile-avatar">
                                    <label htmlFor="fileAvatar">
                                     <span style={{position: 'relative',bottom: '-50px'}}>
                                        <Icon type="picture" style={{ fontSize: '40px'}}/>
                                        <p>Change your avatar</p>
                                    </span>
                                    </label>
                                    <input type="file" id="fileAvatar" accept="image/*" ref="fileUploader"/>
                                </div>
                            </div>
                        </div>

                        <div className="profile-edit-header">
                            <div className="button-edit-profile">
                                <button type="button" className="button-cancel">
                                    <span onClick={() => this.props.onCancel()}>Cancel</span>
                                </button>
                             </div>
                            <div className="button-edit-profile">
                                <button type="button" className="button-save">
                                    <span onClick={() => this.saveDetail()}>Save Change</span>
                                </button>
                            </div>
                        </div>
                        <div className="profile-edit-content">
                            <div className="leftSide">
                                <div className="sidebar">
                                    <div className="sidebar-head">
                                        <div>
                                            <input value = {this.state.userName}
                                                   onChange={e => this.setState({ userName: e.target.value })}>
                                            </input>
                                        </div>
                                        <div>
                                            <input value = {this.state.location}
                                                   placeholder={'locate'}
                                                   onChange={e => this.setState({ location: e.target.value })}>
                                            </input>
                                        </div>
                                        <div>
                                            <input value = {this.state.birthday}
                                                   placeholder={'birthday'}
                                                   onChange={e => this.setState({ birthday: e.target.value })}>
                                            </input>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="centerSide">
                            </div>

                            <div className="rightSide">
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
}
export default EditProfile;
