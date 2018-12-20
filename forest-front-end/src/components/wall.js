import React, {Component} from 'react'
import Follow from "../containers/recommend-follow";
import TweetBoard from '../containers/tweets-board';
import SideBar from '../containers/left-sidebar';
import FollowingList from '../containers/following';
import FollowerList from '../containers/followers'
import {Route, Switch} from 'react-router-dom';

export default class Wall extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/following"
                    children={({ match }) => (
                        <div className={"main-content"}>
                            <div className={"sidebar-left"}>
                                <SideBar/>
                            </div>
                            <div className={"main-right"}>
                                <FollowingList currentUserID = {this.props.currentUserID}/>
                            </div>
                        </div>
                    )}
                  />

                <Route
                    path="/follower"
                    children={({ match }) => (
                        <div className={"main-content"}>
                            <div className={"sidebar-left"}>
                                <SideBar/>
                            </div>
                            <div className={"main-right"}>
                                <FollowerList currentUserID = {this.props.currentUserID}/>
                            </div>
                        </div>
                    )}
                />

                <Route
                    exact path="/:id"
                    children={({ match }) => (
                        <div className={"main-content"}>
                            <div className={"sidebar-left"}>
                                <SideBar/>
                            </div>
                            <div className={"content"}>
                                <TweetBoard currentUserID = {this.props.currentUserID}/>
                            </div>
                            <div className={"sidebar-right"}>
                                <Follow currentUserID = {this.props.currentUserID}/>
                            </div>
                        </div>
                    )}
                />

            </Switch>
        );
    }
}