import {connect} from 'react-redux';
import FollowingList from '../components/following-list'

const mapStateToProps = state => {
	return {
		list_following: state.following.listFollowing
	}
}

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);