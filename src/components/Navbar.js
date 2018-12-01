import {Layout, Menu, Icon, Input,Avatar,Button} from 'antd/lib';
import React, {Component} from 'react';
import './NavStyle.scss'
const {Header} = Layout;
const Search = Input.Search;

class Navbar extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header style={{
                    position: 'fixed',
                    zIndex: 1,
                    display: 'flex',
                    width: '100%',
                    background: '#fff',
                    borderBottom: '1px solid #e8e8e8'
                }}>

                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '62px', border: 'none'}}>
                        <Menu.Item key="1">
                            <Icon type="home"/>
                            Home
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="bell"/>
                            Notification
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="mail"/>
                            Message
                        </Menu.Item>

                    </Menu>
                    <div style={{float:'right'}}>
                        <Icon type="twitter" style={{fontSize: '20px', color: 'blue',marginLeft:'16px'}}/>

                        <Search
                            placeholder="Search Twitter"
                            onSearch={value => console.log(value)}
                            style={{width: 200,marginLeft:'16px'}}
                            className={'inputSearch'}
                        />

                        <Avatar icon="user" style={{marginLeft:'16px'}}/>

                        <Button type="primary" style={{borderRadius: '50px',fontWeight:'bold',marginLeft:'16px'}}>Tweet</Button>
                    </div>

                </Header>
            </Layout>
        )
    }
}

export default Navbar;