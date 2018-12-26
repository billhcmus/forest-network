import {connect} from 'react-redux';
import Navbar from "../components/navbar";
import {getLoginerInfo} from "../actions";
import loginer from "../reducers/UserReducer";

const mapStateToProps = state => {
    return {
        loginerInfo: state.loginer,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getLoginerInfo: (publicKey) => {
            dispatch(getLoginerInfo(publicKey));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);