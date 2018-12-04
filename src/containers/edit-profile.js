import {connect} from 'react-redux';
import EditProfile from "../components/Modal/EditProfile";
import {updateDetail} from "../actions/index"

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateDetail: (userDetail) => {
            dispatch(updateDetail(userDetail))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)