import {connect} from 'react-redux';
import FollowersList from '../components/follower-list'
import {updateListFollower,addListFollower} from "../actions";

const mapStateToProps = state => {
	return {
		list_follower: state.follower,
		activeUser : state.activeUser
	}
}

const mapDispatchToProps = dispatch => {
    return {
		updateListFollower:(publicKey) => {
			dispatch(updateListFollower(publicKey));
		},
		addListFollower:(publicKey,offset) => {
			dispatch(addListFollower(publicKey,offset));
		}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowersList);