import React, {Component} from 'react';
import Navbar from '../containers/navbar';
import UserProfile from '../containers/user-profile'
import Wall from "./wall";

export default class Layout extends Component {

    componentWillMount() {
        if (this.props.match.params.id.length >= 25) {
            localStorage.setItem("CURRENT_USER", this.props.match.params.id)
        }
    }

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