import {connect} from 'react-redux';
import TweetBoard from "../components/tweets-board";
import {getSomeNewestTweet} from "../actions";

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo,
		tweets : state.tweets,
		activeUser : state.activeUser
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSomeNewestTweet: (publicKey) => {
			dispatch(getSomeNewestTweet(publicKey));
		},
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(TweetBoard);