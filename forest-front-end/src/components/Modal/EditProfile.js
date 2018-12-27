import React, {Component} from 'react';
import {Icon} from 'antd';
import '../../css/edit-profile.scss'
import {Keypair} from 'stellar-base';
import WebService from "../../webservice";
import {encode, sign} from '../../transaction';
import {openNotification, warnNotification} from "../../notification";
import {CalculateOxy} from "../../constants";

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            hasNewAvatar: false,
            avatar: this.props.userInfo.avatar,
            displayName: this.props.userInfo.displayName,
            // location:this.props.userInfo.location,

        };
    }

    saveDetail() {
        let secretKey = localStorage.getItem("SECRET_KEY")
        let key = Keypair.fromSecret(secretKey);

        if (this.state.displayName !== this.props.userInfo.displayName) {
            this.service.get(`api/sequence/?id=${key.publicKey()}`).then(result => {
                let tx = {
                    version: 1,
                    account: key.publicKey(),
                    sequence: result.data + 1,
                    memo: Buffer.alloc(0),
                    operation: 'update_account',
                    params: {
                        key: 'name',
                        value: new Buffer(this.state.displayName),
                    },
                }
                sign(tx, secretKey)
                let data_encoding = '0x' + encode(tx).toString('hex');
                this.service.get(`api/accountInfo/?id=${key.publicKey()}`).then(account => {
                    let oxy = CalculateOxy(account.data.balance, account.data.bandwidthTime, account.data.bandwidth);
                    if (encode(tx).length > oxy) {
                        warnNotification("Energy", "Not enough Oxy");
                    } else {
                        this.service.post(`api/user_info`, {tx: data_encoding}).then((res) => {
                        }).catch(err => {
                            openNotification("Error", "Error name return");
                        })
                    }
                })
            })
        }

        if (this.state.avatar !== this.props.userInfo.avatar) {
            this.service.get(`api/sequence/?id=${key.publicKey()}`).then(result => {
                let tx = {
                    version: 1,
                    account: key.publicKey(),
                    sequence: this.state.displayName !== this.props.userInfo.displayName ? result.data + 2 : result.data + 1,
                    memo: Buffer.alloc(0),
                    operation: 'update_account',
                    params: {
                        key: 'picture',
                        value: new Buffer(this.state.avatar, 'binary')
                    },
                }
                sign(tx, secretKey)
                let data_encoding = '0x' + encode(tx).toString('hex');
                this.service.get(`api/accountInfo/?id=${key.publicKey()}`).then(account => {

                    let oxy = CalculateOxy(account.data.balance, account.data.bandwidthTime, account.data.bandwidth);
                    if (encode(tx).length > oxy) {
                        warnNotification("Energy", "Not enough Oxy");
                    } else {
                        if (this.state.displayName !== this.props.userInfo.displayName)
                        {
                            setTimeout(() => {
                                this.service.post(`api/user_info`, {tx: data_encoding}).then((res) => {
                                }).catch(err => {
                                    openNotification("Error", "post picture return failure");
                                })
                            }, 1000);
                        }
                        else
                        {
                            this.service.post(`api/user_info`, {tx: data_encoding}).then((res) => {
                            }).catch(err => {
                                openNotification("Error", "post picture return failure");
                            })
                        }

                    }
                })
            })
        }
        this.props.onCancel();
        this.setState({hasNewAvatar: false})
    }

    handleChosen = (event) => {
        if (event.target.files && event.target.files[0]) {

            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({avatar: e.target.result})
            }
            reader.onloadend = (e) => {
                this.setState({hasNewAvatar: true})
            }
            reader.readAsBinaryString(event.target.files[0])

            this.refs.saveBtn.focus();
            event.target.value = null;
        }
    }

    componentWillMount() {
        let secretKey = localStorage.getItem("SECRET_KEY")
        const key = Keypair.fromSecret(secretKey);
        this.props.getUserInfo(key.publicKey())
        setTimeout(() => {
            this.setState({
                avatar: this.props.userInfo.avatar,
                displayName: this.props.userInfo.displayName,
                // location:this.props.userInfo.location,
                // birthday:moment(this.props.userInfo.birthdate).format('MMM DD, YYYY'),
            })
        }, 3000)
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
                            {/*<label htmlFor="fileTheme">*/}
                            {/*<span style={{position: 'relative',bottom: '-200px'}}>*/}
                            {/*<Icon type="picture" style={{ fontSize: '40px'}}/>*/}
                            {/*<p>Change your header photo</p>*/}
                            {/*</span>*/}
                            {/*</label>*/}
                            {/*<input type="file" id="fileTheme" accept="image/*" ref="fileUploader"/>*/}
                        </div>

                        <div className="profile-edit-avatar">
                            <div className="profile-container-avatar">
                                {
                                    this.state.hasNewAvatar === true ?
                                        <img alt="avatar" src={`data:image/jpeg;base64,${btoa(this.state.avatar)}`}/>
                                        :
                                        <div className="profile-avatar">
                                            <label htmlFor="fileAvatar">
                                                 <span style={{position: 'relative', bottom: '-50px'}}>
                                                    <Icon type="picture" style={{fontSize: '40px'}}/>
                                                    <p>Change your avatar</p>
                                                </span>
                                            </label>
                                            <input type="file" id="fileAvatar" accept="image/*" ref="fileUploader"
                                                   onChange={(e) =>
                                                       this.handleChosen(e)}/>
                                        </div>
                                }

                            </div>
                        </div>

                        <div className="profile-edit-header">
                            <div className="button-edit-profile">
                                <button type="button" className="button-cancel">
                                    <span onClick={() => {
                                        this.setState({hasNewAvatar: false})
                                        this.props.onCancel()
                                    }}>Cancel</span>
                                </button>
                            </div>
                            <div className="button-edit-profile">
                                <button ref={'saveBtn'} type="button" className="button-save">
                                    <span onClick={() => this.saveDetail()}>Save Change</span>
                                </button>
                            </div>
                        </div>
                        <div className="profile-edit-content">
                            <div className="leftSide">
                                <div className="sidebar">
                                    <div className="sidebar-head">
                                        <div>
                                            <input value={this.state.displayName}
                                                   onChange={e => this.setState({displayName: e.target.value})}>
                                            </input>
                                        </div>
                                        {/*<div>*/}
                                        {/*<input value = {this.state.location}*/}
                                        {/*placeholder={'locate'}*/}
                                        {/*onChange={e => this.setState({ location: e.target.value })}>*/}
                                        {/*</input>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                        {/*<input value = {this.state.birthday}*/}
                                        {/*placeholder={'birthday'}*/}
                                        {/*onChange={e => this.setState({ birthday: e.target.value })}>*/}
                                        {/*</input>*/}
                                        {/*</div>*/}
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
        } else {
            return null;
        }
    }
}

export default EditProfile;
