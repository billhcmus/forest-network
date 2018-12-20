import React, {Component} from 'react';
import Navbar from '../containers/navbar';
import UserProfile from '../containers/user-profile'
import Wall from "./wall";

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
           currentUserID: ''
        };
    }
    componentWillMount() {
        if (this.props.match.params.id.length >= 20) {
            this.setState({currentUserID:this.props.match.params.id})
        }
    }

    render() {
        return (
            <div className="Container">
                <Navbar/>
                <UserProfile currentUserID={this.state.currentUserID}/>
                <Wall currentUserID={this.state.currentUserID}/>
            </div>
        );
    }
}