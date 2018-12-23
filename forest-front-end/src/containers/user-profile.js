import {connect} from 'react-redux';
import UserProfile from "../components/user-profile";
import {getCount, toggleFollow, updatePeopleInfo} from "../actions";

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo,
		list_following: state.following,
		activeUser: state.activeUser,
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
        toggleFollow:(hasFollow) => {
            dispatch(toggleFollow(hasFollow));
        },
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);