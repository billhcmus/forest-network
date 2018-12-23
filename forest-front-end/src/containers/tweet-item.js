import {connect} from 'react-redux';
import TweetItem from "../components/tweets-item";
import {getDetailTweet} from "../actions";

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailTweet: (object,loginer) =>{
            dispatch(getDetailTweet(object,loginer))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TweetItem);