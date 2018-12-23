import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {activeUser} from "../actions";
import connect from "react-redux/es/connect/connect";
// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Turn on mobile notification</a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Add or remove this twweet</a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Embed this porfile</a>
//     </Menu.Item>
//   </Menu>
// );

class FollowerItem extends Component {

    render() {
        return (
            <div className="card" style={{width: '23rem'}}>
                <div className="card-img-top card-head" href="#">
                    {!!this.props.FollowItem.theme &&
                    <img className="card-img-top" alt="theme" src={this.props.FollowItem.theme}/>
                    }
                </div>
                <div className="card-body">
                    <div className="avatar">
                        <img src={`data:image/jpeg;base64,
                        ${this.props.FollowItem.avatar?this.props.FollowItem.avatar:'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}`}
                             alt="...."/>
                    </div>
                    <div className="card-action">
                        {/*<button className="btn btn-primary" type="button">*/}
                            {/*<span>Following</span>*/}
                        {/*</button>*/}
                        {/*<div className="actions-group">*/}
                        {/*<Dropdown overlay={menu} trigger={['click']}>*/}
                        {/*<a className="ant-dropdown-link" href="#">*/}
                        {/*<Icon type="small-dash" style={{color: '#657786'}}/>*/}
                        {/*</a>*/}
                        {/*</Dropdown>*/}
                        {/*</div>*/}
                    </div>
                    <div className="card-userfield">
                        <div className="displayName">
                            {this.props.FollowItem.displayName ? this.props.FollowItem.displayName : "Unknown"}
                        </div>

                        <div className="userName">
                            <div
                                onClick={() => {
                                    this.props.activeUser(this.props.FollowItem.userName)
                                    this.props.history.push(`/${this.props.FollowItem.userName}`)
                                }}>
                                {this.props.FollowItem.userName}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        activeUser: (userid) => {
            dispatch(activeUser(userid));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowerItem));
