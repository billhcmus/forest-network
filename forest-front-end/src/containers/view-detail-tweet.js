import {connect} from 'react-redux';
import ViewTweet from "../components/Modal/ViewTweet";
import {getMoreDetailTweet} from "../actions";

const mapStateToProps = state => {
    return {
        tweetDetail: state.tweetDetail
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMoreDetailTweet: (object,loginer,offset) =>{
            dispatch(getMoreDetailTweet(object,loginer,offset))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewTweet);