import {connect} from 'react-redux';
import NewFeedItem from '../components/newfeed-item'
// import {getDetailTweet} from "../actions";

const mapStateToProps = state => {
    return {
        activeUser: state.activeUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewFeedItem);