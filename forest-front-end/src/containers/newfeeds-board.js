import {connect} from 'react-redux';
import NewFeedsBoard from "../components/newfeeds-board";
import { getNews } from "../actions";

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo,
		newfeeds : state.newfeeds,
		activeUser : state.activeUser,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		getNews: (publicKey, page, limit) => {
			dispatch(getNews(publicKey, page, limit));
		}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(NewFeedsBoard);