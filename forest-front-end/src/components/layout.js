import React, {Component} from 'react';
import Navbar from "./navbar";
import UserProfile from '../containers/user-profile'
import Wall from "./wall";

export default class Layout extends Component {
    render() {
        return (
            <div className="Container">
                <Navbar/>
                <UserProfile/>
                <Wall/>
            </div>
        );
    }
}