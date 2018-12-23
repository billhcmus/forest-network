import {connect} from 'react-redux';
import EditProfile from "../components/Modal/EditProfile";
import {getUserInfo} from "../actions/index"

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: (publicKey) => {
            dispatch(getUserInfo(publicKey))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)