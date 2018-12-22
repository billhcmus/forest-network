import React, {Component} from 'react';
import {Icon} from 'antd';
import '../../css/edit-profile.scss'

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // avatar:this.props.userInfo.avatar,
            // theme:this.props.userInfo.theme,
            displayName:this.props.userInfo.displayName,
            avatar:'',
            location:this.props.userInfo.location,

        };
    }

    handleChosen(event)
    {
        if (event.target.files && event.target.files[0]) {
            this.setState({avatar:event.target.files[0]});
            this.refs.saveBtn.focus();
            event.target.value = null;
        }
    }

    saveDetail = () =>{
        this.props.updateDetail(this.state);
        this.props.onCancel();
    }

    render() {
        if (this.props.isModalShow === true) {
            console.log(this.state);
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
                            {/*<input type="file" id="fileTheme" accept="image/*" ref="fileUploader"/>*/}
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
                                                   placeholder="Display name"
                                                   onChange={e => this.setState({ displayName: e.target.value })}>
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
        }
        else {
            return null;
        }
    }
}
export default EditProfile;
