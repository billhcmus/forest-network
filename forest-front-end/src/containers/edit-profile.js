import {connect} from 'react-redux';
import EditProfile from "../components/Modal/EditProfile";
import {updateUserInfo} from "../actions/index"

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: (publicKey) => {
            dispatch(updateUserInfo(publicKey))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)