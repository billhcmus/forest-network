import React, {Component} from 'react';
import '../css/history.scss';
import FollowItem from "./following-item";

class HistoryPayment extends Component {
    //
    componentWillMount(){
        this.props.updatePayment(this.props.activeUser)
    }
    //
    // isBottom(el) {
    //     return el.getBoundingClientRect().bottom <= window.innerHeight;
    // }
    //
    // componentDidMount() {
    //     document.addEventListener('scroll', this.trackScrolling);
    // }
    //
    // componentWillUnmount() {
    //     document.removeEventListener('scroll', this.trackScrolling);
    // }
    //
    // trackScrolling = () => {
    //     const wrappedElement = document.getElementById('scrollfollowing');
    //     if (this.isBottom(wrappedElement)) {
    //         if (this.props.list_following.length > 0) {
    //             this.props.addListFollowing(this.props.activeUser, this.props.list_following.length)
    //         }
    //     }
    // };

    render() {
        return (
            <div className="table-wrapper">
                <table className="table" style={{backgroundColor:'white'}}>
                    <thead>
                    <tr>
                        <th className="is-sortable" >
                            <div className="th-wrap is-numeric">Block <span className="icon is-small" >
                                <i className="mdi mdi-arrow-up"></i></span></div>
                        </th>
                        <th className="">
                            <div className="th-wrap">Hash <span className="icon is-small">
                                <i className="mdi mdi-arrow-up"></i></span></div>
                        </th>
                        <th className="is-sortable">
                            <div className="th-wrap">Time <span className="icon is-small">
                                <i className="mdi mdi-arrow-up"></i></span></div>
                        </th>
                        <th className="">
                            <div className="th-wrap">Sender <span className="icon is-small">
                                <i className="mdi mdi-arrow-up"></i></span></div>
                        </th>
                        <th className="">
                            <div className="th-wrap">Receiver <span className="icon is-small">
                                <i className="mdi mdi-arrow-up"></i></span></div>
                        </th>
                        <th className="is-sortable" >
                            <div className="th-wrap is-numeric">Amount <span className="icon is-small" >
                                <i className="mdi mdi-arrow-up"></i></span></div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.list_payment.map((value, key)=>{
                            return (
                                <tr key={key} className="">
                                    <td data-label="Block" className=""><span><a
                                        className="">{value.block}</a></span>
                                    </td>
                                    <td data-label="Hash" className="compress"><span><a
                                        className="">{value._id}</a></span>
                                    </td>
                                    <td data-label="Time" className="">
                                        <span>{value.time}</span>
                                    </td>
                                    <td data-label="Sender" className="compress"><span><a
                                        className="">{value.tags[0].value}</a></span>
                                    </td>
                                    <td data-label="Receiver" className="compress"><span><a
                                        className="">{value.tags[1].value}</a></span>
                                    </td>
                                    <td data-label="Amount" className=""><span>
                                    <a className="">{value.tx.params.amount}</a></span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default HistoryPayment;
