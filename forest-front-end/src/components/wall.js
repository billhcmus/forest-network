import React, {Component} from 'react'
// import Follow from "../containers/recommend-follow";
import TweetBoard from '../containers/tweets-board';
import SideBar from '../containers/left-sidebar';
import FollowingList from '../containers/following';
import FollowerList from '../containers/followers'
import HistoryPayment from "../containers/history-payment";
import NewFeedsBoard from "../containers/newfeeds-board"

import {Route, Switch} from 'react-router-dom';

export default class Wall extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/home"
                    children={({ match }) => (
                        <div className={"main-content"}>
                            <div className={"sidebar-left"}>
                                <SideBar/>
                            </div>
                            <div className={"content"}>
                                <NewFeedsBoard/>
                            </div>
                        </div>
                    )}
                />

                <Route
                    path="/history"
                    children={({ match }) => (
                        <div className={"main-content"}>
                            <div className={"single-page"}>
                                <HistoryPayment/>
                            </div>
                        </div>
                    )}
                />

                <Route
                    path="/following"
                    children={({ match }) => (
                        <div className={"main-content"}>
                            <div className={"sidebar-left"}>
                                <SideBar/>
                            </div>
                            <div className={"main-right"}>
                                <FollowingList/>
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
                                <FollowerList/>
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
                            <div className={"main-right"}>
                                <TweetBoard/>
                            </div>
                            {/*<div className={"sidebar-right"}>*/}
                                {/*<Follow/>*/}
                            {/*</div>*/}
                        </div>
                    )}
                />

            </Switch>
        );
    }
}

