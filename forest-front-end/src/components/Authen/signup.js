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
                    publicKey: key.publicKey(),
                    secretKey: key.secret()
                };

                let secretKey = key.secret();
                this.props.form.setFieldsValue(data);
                localStorage.setItem("SECRET_KEY", secretKey);
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
                <span>Secret Key</span>
                <FormItem>
                    {getFieldDecorator('secretKey', {
                        //rules: [{required: true, message: 'Please input your name!'}],
                    })(
                        <Input prefix={<Icon type="profile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Secret Key"/>
                    )}
                </FormItem>
                <span>Public Key</span>
                <FormItem>
                    {getFieldDecorator('publicKey', {
                        //rules: [{required: true, message: 'Please input your name!'}],
                    })(
                        <Input prefix={<Icon type="profile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Public Key"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Generate Key
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalRegisterForm = Form.create()(RegisterForm);

export default withRouter(WrappedNormalRegisterForm)