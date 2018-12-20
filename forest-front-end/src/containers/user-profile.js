import {connect} from 'react-redux';
import UserProfile from "../components/user-profile";
import {getCount, getSomeNewestTweet, updatePeopleInfo} from "../actions";

const mapStateToProps = state => {
	console.log(state)
	return {
		userInfo: state.userInfo,
		list_following: state.following,
	}
}

const mapDispatchToProps = dispatch => {
    return {
		getCount: (publicKey) => {
			dispatch(getCount(publicKey));
		},
		updatePeopleInfo:(loginKey,peopleKey) => {
			dispatch(updatePeopleInfo(loginKey,peopleKey));
		},

	}
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);