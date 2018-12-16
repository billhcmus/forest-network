import {connect} from 'react-redux';
import WrappedNormalRegisterForm from '../components/Authen/signup'
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


export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalRegisterForm);