import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
  </Menu>
);

class FollowingItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card" style={{width: '23rem'}}>
        <a className="card-img-top card-head" href="#"></a>
        <div className="card-body">
          <a href="#" className="avatar">
            <img src="https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg" alt="...."/>
          </a>
          <div className="card-action">
            <a href="#" className="btn btn-primary">Go somewhere</a>
            <div className="actions-group">
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="small-dash" style={{color: '#657786'}}/>
                </a>
              </Dropdown>
            </div>
          </div>
          <div className="card-userfield">
            <div className="displayName">
              JBThong
            </div>

            <div className="userName">
              jb_thong
            </div>
            <div className="bio">
              .......
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default FollowingItem;
