import {connect} from 'react-redux';
import ViewTweet from "../components/Modal/ViewTweet";

const mapStateToProps = state => {
    return {
        tweetDetail: state.tweetDetail
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewTweet);