import {Layout, Menu, Icon, Input,Avatar,Button,Dropdown} from 'antd';
import React, {Component} from 'react';
import '../css/navstyle.css'
const {Header} = Layout;
const Search = Input.Search;

const menuDrop = (
    <div style={{boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'}}>
        <div style={{padding:'15px'}}>
            <b>Nguyễn Đình Tiến</b>
            <br/>
            @nguditi
        </div>
        <Menu >
            <Menu.Divider />
            <Menu.Item key="0">
                <Icon type="user"/>
                Detail
            </Menu.Item>
            <Menu.Item key="1">
                <Icon type="poweroff"/>
                Logout
            </Menu.Item>
        </Menu>
    </div>

);


class Navbar extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header style={{
                    position: 'fixed',
                    zIndex: 2,
                    width: '100%',
                    background: '#fff',
                    height: '48px',
                    lineHeight: '46px',
                    borderBottom: '1px solid #e8e8e8',
                }}>
                    <div className={'container'}>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{lineHeight: '46px', border: 'none', display: 'inline-block', float: 'left'}}>
                            <Menu.Item key="1" style={{fontWeight:'600'}}>
                                <Icon type="home"/>
                                Home
                            </Menu.Item>
                            <Menu.Item key="2" style={{fontWeight:'600'}}>
                                <Icon type="bell"/>
                                Notification
                            </Menu.Item>
                            <Menu.Item key="3" style={{fontWeight:'600'}}>
                                <Icon type="mail"/>
                                Message
                            </Menu.Item>

                        </Menu>

                        <Icon type="twitter" style={{fontSize: '20px', color: '#1da1f2'}}/>

                        <div style={{float:'right'}}>
                            <Search
                                placeholder="Search Twitter"
                                onSearch={value => console.log(value)}
                                style={{width: 200,marginLeft:'16px'}}
                                className={'inputSearch'}
                            />

                            <Dropdown style={{cursor: 'pointer'}} overlay={menuDrop} trigger={['click']} placement="bottomRight">
                                <Avatar icon="user" style={{marginLeft:'16px'}}/>
                            </Dropdown>

                            <Button type="primary" style={{borderRadius: '50px',fontWeight:'bold',marginLeft:'16px'}}>Tweet</Button>
                        </div>
                    </div>
                </Header>
            </Layout>
        )
    }
}

export default Navbar;