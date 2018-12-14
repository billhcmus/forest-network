import React, {Component} from 'react'
import {Form, Icon, Input, Button} from 'antd';
import {withRouter} from "react-router-dom";
import WebService from "../../webservice";
import {Keypair} from 'stellar-base';
import './auth-style.scss'
import _ from 'lodash'

const FormItem = Form.Item;

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.service = new WebService();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const key = Keypair.random();
                const data = {
                    publicKey: key.publicKey()
                };

                let secretKey = key.secret();
                console.log(secretKey);
                this.service.post('api/user', data).then(res => {
                    if (_.get(res.data, "code") === -1) {
                        alert("Error Register");
                    } else {
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
                })
                // return new Promise((resolve, reject) => {
                //     this.service.post('api/users/signup', user).then((response) => {
                //         store.dispatch(setStatusLogin({login: true, signup: false}));
                //     }).catch(err => {
                //         const message = _.get(err, 'response.data.error.message', "Signup Error!");
                //         alert(message);
                //     })
                // })
            }
        });
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value !== form.getFieldValue('password')) {
            callback('Password does not match!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('fullName', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input prefix={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Full Name" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules:[{required: true, message: 'Please input your email!'}]
                    })(<Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confirmPassword', {
                        rules: [{validator:this.checkPassword}],
                    })(
                        <Input prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign Up
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalRegisterForm = Form.create()(RegisterForm);

export default withRouter(WrappedNormalRegisterForm)