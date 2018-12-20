import {Layout, Menu, Icon, Input,Avatar,Button,Dropdown} from 'antd/lib';
import Tweet from "../components/Modal/Tweet";
import Transfer from "../components/Modal/Transfer";
import React, {Component} from 'react';
import _ from 'lodash';
import '../css/navstyle.css';
import {Keypair} from "stellar-base";
import {updateUserInfo} from "../actions";
import {Link} from "react-router-dom";
const {Header} = Layout;
const Search = Input.Search;

function handleMenuClick(e) {
    if (_.get(e, "key") === "1") {
        localStorage.clear();
    }
}

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTweetShow: false,
            isTransShow: false,
        };
    }

    menuDrop = (
        <div style={{boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'}}>
            <Menu onClick={handleMenuClick}>
                <Menu.Divider />
                <Menu.Item key="0">
                    <Icon type="user"/>
                    Detail
                </Menu.Item>
                <Menu.Item key="1">
                    <Icon type="logout"/>
                    Logout
                </Menu.Item>
            </Menu>
        </div>

    );

    handleCancel =(e)=>{
        this.setState({
            isTweetShow: false,
            isTransShow: false
        })
    }


    handleTweetClick =(e)=>{
        this.setState({
            isTweetShow: true
        })
    }

    handleTransClick =(e)=>{
        this.setState({
            isTransShow: true
        })
    }

    componentWillMount()
    {
        this.props.getLoginerInfo(Keypair.fromSecret(localStorage.getItem("SECRET_KEY")).publicKey());
    }

    render() {
        return (
            <Layout className="layout">
                <Header style={{
                    position: 'fixed',
                    zIndex: 14,
                    width: '100%',
                    background: '#fff',
                    height: '46px',
                    lineHeight: '44px',
                    borderBottom: '1px solid #e8e8e8',
                    padding: 0
                }}>
                    <div className={'container'}>
                        <div className={'menu'}>
                            <Menu
                                overflowedIndicator={<Icon type="bars"/>}
                                theme="light"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{lineHeight: '44px', border: 'none'}}>
                                <Menu.Item key="1" style={{fontWeight:'600'}}>
                                    <Link to={"/"}>
                                        <Icon type="home"/>
                                        Home
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" style={{fontWeight:'600'}}>
                                    <Icon type="bell"/>
                                    Notification
                                </Menu.Item>

                            </Menu>
                        </div>

                        <Icon type="twitter" style={{fontSize: '20px', color: '#1da1f2'}}/>

                        <div style={{float:'right'}}>
                            <Search
                                placeholder="Search Twitter"
                                onSearch={value => console.log(value)}
                                style={{width: 200,marginLeft:'16px'}}
                                className={'inputSearch'}
                            />

                            <Dropdown overlay={this.menuDrop} trigger={['click']} placement="bottomRight">
                                <Avatar src = {`data:image/jpeg;base64,${this.props.loginerInfo.avatar}`} icon="user" style={{marginLeft:'16px'}}/>
                            </Dropdown>

                            <Button type="primary" style={{borderRadius: '50px',fontWeight:'bold',marginLeft:'16px'}} onClick={(e)=>this.handleTransClick(e)}>Transfer</Button>

                            <Button type="primary" style={{borderRadius: '50px',fontWeight:'bold',marginLeft:'16px'}} onClick={(e)=>this.handleTweetClick(e)}>Tweet</Button>
                        </div>
                        <Tweet isTweetShow={this.state.isTweetShow} onCancel={(e)=>this.handleCancel(e)}/>
                        <Transfer isTransShow={this.state.isTransShow} onCancel={(e)=>this.handleCancel(e)}/>

                    </div>
                </Header>
            </Layout>
        )
    }
}

export default Navbar;