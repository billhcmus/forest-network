import React, {Component} from 'react'
import WrappedNormalLoginForm from './login'
import WrappedNormalRegisterForm from './signup'
export default class LoginAndSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            signup: false
        };
        this.changeActionType = this.changeActionType.bind(this);
    }

    changeActionType(type) {
        let status = {login: true, signup: false};
        if (type === "signup") {
            status = {login: false, signup: true};
        }
        this.setState(status)
    }

    render() {
        return (
            <div>
                <div className="login_tab">
                    <p className={this.state.login?"login-toggle-after":"login-toggle-before"} onClick={() => this.changeActionType("login")}>Log In</p>
                    <p className={this.state.signup?"signup-toggle-after":"signup-toggle-before"} onClick={() => this.changeActionType("signup")}>Sign Up</p>
                </div>
                {this.state.login?<WrappedNormalLoginForm/>:null}
                {this.state.signup?<WrappedNormalRegisterForm/>:null}
            </div>
        )
    }
}