import {connect} from 'react-redux';
import Navbar from "../components/navbar";
import {updatePeopleLoginInfo} from "../actions";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePeopleLoginInfo: (publicKey) => {
            dispatch(updatePeopleLoginInfo(publicKey));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);