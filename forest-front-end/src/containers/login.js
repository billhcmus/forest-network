import {connect} from 'react-redux';
import WrappedNormalLoginForm from '../components/Authen/login'
import {activeUser} from "../actions";

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        activeUser: (userid) => {
            dispatch(activeUser(userid));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);