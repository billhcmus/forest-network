import React, {Component} from 'react';
import { Pagination} from 'antd';
import '../css/history.scss';
import moment from "moment";
import {Keypair} from "stellar-base";
import DetailTransaction from "../containers/detail-transaction"

const ITEM_PER_PAGE = 10;

class HistoryPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalShow: false,
            currentPage: 1,
        };
    }


    handleHashCancel = (e) => {
        this.setState({
            isModalShow: false
        })
    }

    handleHashClick = (e,id) => {
        e.stopPropagation()
        this.setState({
            isModalShow: true
        })
        this.props.getDetailTransaction(id)
    }


    componentWillMount(){
        this.props.updatePayment(this.props.activeUser)
    }

    handlePageChange = (pageNumber) =>{
        this.setState({currentPage:pageNumber})
    }

    getItemInCurrentPage = (list) =>{
        return list.slice((this.state.currentPage-1)*ITEM_PER_PAGE,this.state.currentPage*ITEM_PER_PAGE)
    }

    render() {
        return (
            <div className="table-wrapper">
                <DetailTransaction isModalShow={this.state.isModalShow} onCancel={(e) => this.handleHashCancel(e)}/>
                <table className="table" style={{backgroundColor:'white'}}>
                    <thead>
                    <tr>
                        <th className="is-sortable" >
                            <div className="th-wrap is-numeric">Block <span className="icon is-small" >
                                <i className=""></i></span></div>
                        </th>
                        <th className="">
                            <div className="th-wrap">Hash <span className="icon is-small">
                                <i className=""></i></span></div>
                        </th>
                        <th className="is-sortable">
                            <div className="th-wrap">Time <span className="icon is-small">
                                <i className=""></i></span></div>
                        </th>
                        <th className="">
                            <div className="th-wrap">Sender <span className="icon is-small">
                                <i className=""></i></span></div>
                        </th>
                        <th className="">
                            <div className="th-wrap">Receiver <span className="icon is-small">
                                <i className=""></i></span></div>
                        </th>
                        <th className="is-sortable" >
                            <div className="th-wrap is-numeric">Amount <span className="icon is-small" >
                                <i className=""></i></span></div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.getItemInCurrentPage(this.props.list_payment).map((value, key)=>{
                            return (
                                <tr key={key} className={(value.tags[0].value !== this.props.activeUser)
                                    ? "row-payment received-money"
                                    : "row-payment send-money"}>
                                    <td data-label="Block" className="">
                                        <span>{value.block}</span>
                                    </td>
                                    <td data-label="Hash" className="clickable">
                                        <span onClick={(e) =>this.handleHashClick(e,value._id)}>
                                            {value._id.slice(0,14)}...
                                        </span>
                                    </td>
                                    <td data-label="Time" className="">
                                        <span>{moment(value.time).format()}</span>
                                    </td>
                                    <td data-label="Sender" className="clickable">
                                        <span onClick={(e) => {
                                            e.stopPropagation()
                                            if (this.props.activeUser !== value.tags[0].value)
                                                window.location =`/${value.tags[0].value}`
                                        }}>{value.tags[0].value.slice(0,14)}...</span>
                                    </td>
                                    <td data-label="Receiver" className="clickable">
                                        <span onClick={(e) => {
                                            e.stopPropagation()
                                            if (this.props.activeUser !== value.tags[1].value)
                                                window.location =`/${value.tags[1].value}`
                                        }}>{value.tags[1].value.slice(0,14)}...</span>
                                    </td>
                                    <td data-label="Amount" className="">
                                        <span>{value.tx.params.amount}</span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <Pagination total={this.props.list_payment.length}
                            hideOnSinglePage={true}
                            onChange={this.handlePageChange}
                            defaultPageSize={ITEM_PER_PAGE}
                            showQuickJumper/>
            </div>
        )
    }
}

export default HistoryPayment;
