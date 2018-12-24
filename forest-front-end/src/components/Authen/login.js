import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import {withRouter} from "react-router-dom";
import _ from 'lodash'
import './auth-style.scss'
import WebService from "../../webservice";
import { Keypair } from 'stellar-base';

const FormItem = Form.Item;

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.service = new WebService();
        this.checkAuth();
    }

    checkAuth() {
        if (localStorage.getItem('token')) {
            window.location = `/${ Keypair.fromSecret(localStorage.getItem("SECRET_KEY")).publicKey()}`;
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const user = {
                    publicKey: Keypair.fromSecret(values.secretkey).publicKey(),
                    password: values.password
                };
                this.service.post('api/users/login', user).then((response) => {
                    localStorage.setItem('token', Keypair.fromSecret(values.secretkey).publicKey());
                    localStorage.setItem("SECRET_KEY", values.secretkey);
                    this.props.history.push(`/${user.publicKey}`);
                }).catch(err => {
                    const message = _.get(err, 'response.data.error.message', "Login Error!");
                    alert(message);
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator("secretkey", { initialValue: localStorage.getItem("SECRET_KEY"),
                        rules: [{ required: true, message: "Please input your secret key!" }]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="Secret Key"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your Password!" }]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default withRouter(WrappedNormalLoginForm);
