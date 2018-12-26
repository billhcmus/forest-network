import {connect} from 'react-redux';
import NewFeedsBoard from "../components/newfeeds-board";
// import {getSomeNewestTweet,getSomeMoreTweet} from "../actions";

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo,
		tweets : state.tweets,
		activeUser : state.activeUser,
	}
};

const mapDispatchToProps = dispatch => {
	return {
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(NewFeedsBoard);