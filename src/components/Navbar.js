import {Layout, Menu, Icon, Input,Avatar,Button,Dropdown} from 'antd/lib';
import React, {Component} from 'react';
import '../css//navstyle.css'
const {Header} = Layout;
const Search = Input.Search;

const menuDrop = (
    <div style={{boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'}}>
        <div style={{padding:'15px'}}>
            <b>Nguyễn Đình Tiến</b>
            <br></br>
            @nguditi
        </div>
        <Menu >
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


class Navbar extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header style={{
                    position: 'fixed',
                    zIndex: 2,
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
                                    <Icon type="home"/>
                                    Home
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

                            <Dropdown overlay={menuDrop} trigger={['click']} placement="bottomRight">
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