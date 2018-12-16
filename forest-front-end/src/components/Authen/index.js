import React, {Component} from 'react'
import WrappedNormalLoginForm from './login'
import WrappedNormalRegisterForm from '../../containers/signup'

export default class LoginAndSignUp extends Component {
    constructor(props) {
        super(props);
        this.changeActionType = this.changeActionType.bind(this);
    }

    changeActionType(type) {
        let status = {login: true, signup: false};
        if (type === "signup") {
            status = {login: false, signup: true};
        }
        this.props.changeAuthTab(status);
    }

    render() {
        return (
            <div>
                <div className="login_tab">
                    <p className={this.props.authTab.login?"login-toggle-after":"login-toggle-before"} onClick={() => this.changeActionType("login")}>Log In</p>
                    <p className={this.props.authTab.signup?"signup-toggle-after":"signup-toggle-before"} onClick={() => this.changeActionType("signup")}>Sign Up</p>
                </div>
                {this.props.authTab.login?<WrappedNormalLoginForm/>:null}
                {this.props.authTab.signup?<WrappedNormalRegisterForm/>:null}
            </div>
        )
    }
}