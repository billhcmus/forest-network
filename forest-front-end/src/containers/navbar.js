import {connect} from 'react-redux';
import Navbar from "../components/navbar";
import {getPeopleLoginInfo} from "../actions";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPeopleLoginInfo: (publicKey) => {
            dispatch(getPeopleLoginInfo(publicKey));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);