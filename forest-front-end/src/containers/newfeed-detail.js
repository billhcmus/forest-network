import {connect} from 'react-redux';
import ViewNew from "../components/Modal/ViewNewFeed";
import {getDetailNewFeed} from "../actions";

const mapStateToProps = state => {
    return {
        newfeedDetail: state.newfeedDetail,
        activeUser: state.activeUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewNew);