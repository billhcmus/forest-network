import {connect} from 'react-redux';
import FollowersList from '../components/follower-list'
import {updateListFollower} from "../actions";

const mapStateToProps = state => {
	return {
		list_follower: state.follower
	}
}

const mapDispatchToProps = dispatch => {
    return {
		updateListFollower:(publicKey) => {
			dispatch(updateListFollower(publicKey));
		}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowersList);