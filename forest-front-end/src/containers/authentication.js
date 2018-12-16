import {connect} from 'react-redux';
import LoginAndSignUp from "../components/Authen";
import {changeAuthTab} from "../actions";

const mapStateToProps = state => {
    return {
        authTab: state.AuthReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeAuthTab: (status) => {
            dispatch(changeAuthTab(status));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginAndSignUp);