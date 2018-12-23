import {connect} from 'react-redux';
import TweetBoard from "../components/tweets-board";
import {getSomeNewestTweet,getSomeMoreTweet} from "../actions";

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo,
		tweets : state.tweets,
		activeUser : state.activeUser,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSomeNewestTweet: (publicKey,loginer) => {
			dispatch(getSomeNewestTweet(publicKey,loginer));
		},
		getSomeMoreTweet:(publicKey,loginer,offset) => {
			dispatch(getSomeMoreTweet(publicKey,loginer,offset));
		},
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(TweetBoard);