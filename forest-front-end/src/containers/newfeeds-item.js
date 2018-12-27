import {connect} from 'react-redux';
import NewFeedItem from '../components/newfeed-item'
import {getDetailNewFeed} from "../actions";

const mapStateToProps = state => {
    return {
        activeUser: state.activeUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailNewFeed: (object,loginer) =>{
            dispatch(getDetailNewFeed(object,loginer))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewFeedItem);