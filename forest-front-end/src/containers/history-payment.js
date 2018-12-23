import {connect} from 'react-redux';
import HistoryPayment from '../components/history-payment'
import {updatePayment} from "../actions";

const mapStateToProps = state => {
	return {
		list_payment: state.payment,
		activeUser : state.activeUser
	}
}

const mapDispatchToProps = dispatch => {
    return {
		updatePayment:(publicKey) => {
			dispatch(updatePayment(publicKey));
		}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(HistoryPayment);