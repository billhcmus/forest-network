import {connect} from 'react-redux';
import EditProfile from "../components/Modal/EditProfile";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)