import {connect} from 'react-redux';
import UserProfile from "../components/UserProfile";

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);