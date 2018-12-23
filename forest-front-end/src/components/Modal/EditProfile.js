import React, {Component} from 'react';
import {Icon} from 'antd';
import '../../css/edit-profile.scss'
import moment from "moment";
import { Keypair } from 'stellar-base';
import WebService from "../../webservice";
import { encode,sign } from '../../transaction';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            avatar:this.props.userInfo.avatar,
            displayName: this.props.userInfo.displayName,
            location:this.props.userInfo.location,

        };
    }

    saveDetail() {
            let secretKey = localStorage.getItem("SECRET_KEY")
            let key = Keypair.fromSecret(secretKey);

            if(this.state.displayName !== this.props.userInfo.displayName) {
                this.service.get(`api/sequence/?id=${key.publicKey()}`).then(result =>{
                    console.log(result.data)
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
                            signature: new Buffer(64)
                        }
                        sign(tx, secretKey)
                        let data_encoding = '0x'+ encode(tx).toString('hex');
                        console.log(data_encoding)
                        this.service.post(`api/user_info`,{tx: data_encoding}).then((res) => {
                            setTimeout(()=>{ 
                                this.props.getUserInfo(key.publicKey())
                            }, 1000);
                        }).catch(err => console.log(err))
                        return
                    })
            }

            if(this.state.avatar !== this.props.userInfo.avatar) {
                this.service.get(`api/sequence/?id=${key.publicKey()}`).then(result =>{
                    console.log(result.data)
                    let tx = {
                        version: 1,
                        account: key.publicKey(),
                        sequence: result.data + 1,
                        memo: Buffer.alloc(0),
                        operation: 'update_account',
                        params: {
                            key: 'picture',
                            value: new Buffer(this.state.avatar, 'binary')
                        },
                        signature: new Buffer(64)
                    }
                    sign(tx, secretKey)
                    let data_encoding = '0x'+ encode(tx).toString('hex');
                    // this.service.post(`api/user_info`,{tx: data_encoding})
                    //         .then((res)=>{
                    //             setTimeout(()=>{ 
                    //                 this.props.getUserInfo(key.publicKey())
                    //             }, 1000);
                    //         })
                    //         .catch((err)=>{
                    //             console.log(err)
                    //         })
                })
            }
        this.props.onCancel();
    }
   
    handleChosen(event) {
        if (event.target.files && event.target.files[0]) {

            var reader = new FileReader();
            reader.onload = (e)=>{
                this.setState({avatar: e.target.result})
            }
            reader.readAsBinaryString(event.target.files[0])

            this.refs.saveBtn.focus();
            event.target.value = null;
        }
    }

    componentDidMount() {
        let secretKey = localStorage.getItem("SECRET_KEY")
        const key = Keypair.fromSecret(secretKey);
        this.props.getUserInfo(key.publicKey())
        this.setState({
            avatar:this.props.userInfo.avatar,
            displayName: this.props.userInfo.displayName,
            location:this.props.userInfo.location,
            birthday:moment(this.props.userInfo.birthdate).format('MMM DD, YYYY'),
        })
    }

    render() {
        console.log("render")
        console.log(this.props.userInfo)
        console.log(this.state)

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
                                    <input type="file" id="fileAvatar" accept="image/*" ref="fileUploader" onChange={(e) =>
                                        this.handleChosen(e)}/>
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
                                <button  ref={'saveBtn'} type="button" className="button-save">
                                    <span onClick={() => this.saveDetail()}>Save Change</span>
                                </button>
                            </div>
                        </div>
                        <div className="profile-edit-content">
                            <div className="leftSide">
                                <div className="sidebar">
                                    <div className="sidebar-head">
                                        <div>
                                            <input value = {this.state.displayName}
                                                   onChange={e => this.setState({ displayName: e.target.value })}>
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
