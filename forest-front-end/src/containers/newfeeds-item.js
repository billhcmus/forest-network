import {connect} from 'react-redux';
import NewFeedItem from '../components/newfeed-item'
import {getDetailTransaction} from "../actions";

const mapStateToProps = state => {
    return {
        activeUser: state.activeUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailTransaction:(id) => {
            dispatch(getDetailTransaction(id));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewFeedItem);