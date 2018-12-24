import React, {Component} from 'react';
import { Pagination } from 'antd';
import '../css/history.scss';
import moment from "moment";

const ITEM_PER_PAGE = 5;

class HistoryPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
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
                                    <td data-label="Hash" className="">
                                        <span>{value._id.slice(0,14)}...</span>
                                    </td>
                                    <td data-label="Time" className="">
                                        <span>{moment(value.time).format()}</span>
                                    </td>
                                    <td data-label="Sender" className="">
                                        <span>{value.tags[0].value.slice(0,14)}...</span>
                                    </td>
                                    <td data-label="Receiver" className="">
                                        <span>{value.tags[1].value.slice(0,14)}...</span>
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
