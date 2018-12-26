import React, {Component} from 'react';
import Navbar from '../containers/navbar';
import UserProfile from '../containers/user-profile'
import Wall from "./wall";
import connect from "react-redux/es/connect/connect";
import {Route, Switch} from 'react-router-dom';
import {activeUser, createNewConnection} from "../actions";
import Connection from "../connection";

class Layout extends Component {

    componentWillMount() {
        //Cần thay thế 1 biện pháp để xác định id có phải là 1 publickey ko
        /*important*/
        if (this.props.match.params.id && this.props.match.params.id.length > 25) {
            this.props.activeUser(this.props.match.params.id)
        }
        else if (localStorage.getItem("ACTIVE_USER"))
        {
            this.props.activeUser(localStorage.getItem("ACTIVE_USER"))
        }
        /*important*/

        this.props.createNewConnection(new Connection());
    }

    render() {
        return (
            <div className="">
                <Navbar/>
                {this.props.match && this.props.match.path !== '/home'
                    && <UserProfile/>
                }
                <Wall/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        activeUser: (userid) => {
            dispatch(activeUser(userid));
        },
        createNewConnection: (connection) => {
            dispatch(createNewConnection(connection));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);



