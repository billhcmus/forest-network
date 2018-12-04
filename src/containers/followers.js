import {connect} from 'react-redux';
import FollowersList from '../components/following-list'

const mapStateToProps = state => {
	return {
		list_following: state.follower.listFollower
	}
}

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowersList);