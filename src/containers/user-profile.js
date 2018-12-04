import {connect} from 'react-redux';
import UserProfile from "../components/UserProfile";
import {increaseFollowing} from "../actions";

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
    return {

	}
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);