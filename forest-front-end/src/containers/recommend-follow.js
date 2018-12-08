import {connect} from 'react-redux';
import RecommendFollow from "../components/Recommend-Follow/recommend-follow";
import {dismissUserRecommend, increaseFollowing} from "../actions";

const mapStateToProps = state => ({
    recommendList: state.RecommendReducer.recommendList,
});


const mapDispatchToProps = dispatch => {
    return {
        dismissUserRecommend: (username) => {
            dispatch(dismissUserRecommend(username));
        },
        increaseFollowing: () => {
            dispatch(increaseFollowing())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(RecommendFollow);