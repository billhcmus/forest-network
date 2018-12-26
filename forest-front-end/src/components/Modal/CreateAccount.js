import {Button, Form, Icon, Input, Modal} from 'antd';
import React, {Component} from 'react';
import "../../css/compose-tweet.scss"
import {Keypair} from 'stellar-base';
import WebService from "../../webservice";
import {encode, sign} from '../../transaction/index';
import _ from 'lodash'
import {openNotification,warnNotification} from "../../notification";

const FormItem = Form.Item;

class Register extends Component {

    constructor(props) {
        super(props);
        this.service = new WebService();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const secret = localStorage.getItem("SECRET_KEY")
                const address = values.address;
                this.service.get(`api/sequence/?id=${
                    Keypair.fromSecret(secret).publicKey()}`
                ).then(seq => {
                    let tx = {
                        version: 1,
                        account: '',
                        sequence: seq.data + 1,
                        memo: Buffer.alloc(0),
                        operation: 'create_account',
                        params: {address: address},
                    };

                    try {
                        sign(tx, secret);
                        let data_encoding = '0x' + encode(tx).toString('hex');
                        this.service.post(`api/users/sendTx`, {tx: data_encoding}).then((response) => {
                            openNotification("Register", "Successfully");
                            this.props.onCancel();
                        }).catch(err => {
                            const message = _.get(err, 'response.data.error.message', "Register return with failure!");
                            warnNotification("Error", message);
                        })
                    }
                    catch (e) {
                        warnNotification("Error","Invalid address")
                    }
                })
            }

        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="Register"
                centered
                visible={this.props.isRegisterShow}
                onCancel={() => this.props.onCancel()}
                footer={null}
                style={{padding:0}}
            >
                <div className="modal-body">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator("address",{
                                rules: [{ required: true, message: "Please input address" }]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    placeholder="Address"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Register
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Modal>

        );
    }
}
export default Form.create()(Register);
