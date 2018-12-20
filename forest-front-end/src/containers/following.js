import {connect} from 'react-redux';
import FollowingList from '../components/following-list'
import {updateListFollowing} from "../actions";

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
		}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);