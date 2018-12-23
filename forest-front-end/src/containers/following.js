import {connect} from 'react-redux';
import FollowingList from '../components/following-list'
import {addListFollowing, updateListFollowing} from "../actions";

const mapStateToProps = state => {
	return {
		list_following: state.following,
		activeUser : state.activeUser
	}
}

const mapDispatchToProps = dispatch => {
    return {
		updateListFollowing:(publicKey) => {
			dispatch(updateListFollowing(publicKey));
		},
		addListFollowing:(publicKey,offset) => {
		dispatch(addListFollowing(publicKey,offset));
	}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);