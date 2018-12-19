import {connect} from 'react-redux';
import UserProfile from "../components/user-profile";
import {getCount} from "../actions";

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
    return {
		getCount: (publicKey) => {
			dispatch(getCount(publicKey));
		}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);