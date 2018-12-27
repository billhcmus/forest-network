import {Button, Form, Icon, Input, Modal} from 'antd';
import React, {Component} from 'react';
import "../../css/compose-tweet.scss"
import {Keypair} from 'stellar-base';
import WebService from "../../webservice";
import {encode, sign} from '../../transaction/index';
import _ from 'lodash'
import {openNotification, warnNotification} from "../../notification";
import {CalculateOxy,BlockAmount} from "../../constants";


const FormItem = Form.Item;

class TransferForm extends Component {

    constructor(props) {
        super(props);
        this.service = new WebService();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const secret = localStorage.getItem("SECRET_KEY");
                const money = values.money;
                const address = values.account;
                const memo = values.memo ? Buffer.from(values.memo) : Buffer.alloc(0);
                this.service.get(`api/accountInfo/?id=${Keypair.fromSecret(secret).publicKey()}`).then(account => {
                    const blockedAmount = BlockAmount(account.data.bandwidth)
                    if (account.data.balance < money) {
                        warnNotification("Transfer", "Not enough balance")
                    }
                    else if (account.data.balance - money < blockedAmount) {
                        warnNotification("Transfer", `Over block amount,
                         Limit is: ${account.data.balance - blockedAmount}`)
                    }
                    else if (account.data._id === address) {
                        warnNotification("Transfer", `It's silly, you transfer yourself`)
                    }
                    else {
                        this.service.get(`api/sequence/?id=${
                            Keypair.fromSecret(secret).publicKey()}`
                        ).then(seq =>{
                            let tx = {
                                version: 1,
                                account: '',
                                sequence: seq.data + 1,
                                memo: memo,
                                operation: 'payment',
                                params: {
                                    address : address,
                                    amount : +money,
                                }
                            };

                            sign(tx,secret);
                            let data_encoding = '0x' + encode(tx).toString('hex');

                            let oxy = CalculateOxy(account.data.balance, account.data.bandwidthTime, account.data.bandwidth);

                            if (encode(tx).length > oxy) {
                                warnNotification("Energy", "Not enough Oxy");
                            } else {
                                this.service.post(`api/users/sendTx`,{tx: data_encoding}).then((response) => {
                                    this.props.onCancel();
                                }).catch(err => {
                                    const message = _.get(err, 'response.data.error.message', "Transaction Unsuccess!");
                                    openNotification("Error", message);
                                })
                            }
                        })
                    }
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="Transfer money"
                centered
                visible={this.props.isTransShow}
                onCancel={() => this.props.onCancel()}
                footer={null}
                style={{padding:0}}
            >
                <div className="modal-body">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator("account",{
                                rules: [{ required: true, message: "Please input address" }]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    placeholder="Address"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("money", {
                                rules: [{ required: true, message: "Please input the money to transfer!" }]
                            })(
                                <Input
                                    prefix={<Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    type="number"
                                    placeholder="Money"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("memo")(
                                <Input
                                    prefix={<Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    placeholder="Your message for this money"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Transfer this
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Modal>

        );
    }
}
export default Form.create()(TransferForm);
