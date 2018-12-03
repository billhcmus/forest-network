import React, {Component} from 'react'
import Follow from "../containers/Follow";
import TweetBoard from '../containers/tweets-board';
import SideBar from '../containers/sidebar';

export default class Wall extends Component {
    render() {
        return (
            <div className={"main-content"}>
                <div className={"sidebar-left"}>
                    <SideBar/>
                </div>
                <div className={"content"}>
                    <TweetBoard/>
                </div>
                <div className={"sidebar-right"}>
                    <Follow/>
                </div>
            </div>
        );
    }
}