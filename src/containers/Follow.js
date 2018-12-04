import {connect} from 'react-redux';
import Follow from "../components/Follow/Follow";
import {dismissUserRecommend} from "../actions";

const mapStateToProps = state => ({
    recommendList: state.RecommendReducer.recommendList,
});


const mapDispatchToProps = dispatch => {
    return {
        dismissUserRecommend: (username) => {
            dispatch(dismissUserRecommend(username));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Follow);