import {connect} from 'react-redux';
import TweetBoard from "../components/tweets-board";

const mapStateToProps = state => {
	return {
		tweets: state.tweets
	}
};


const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(TweetBoard);