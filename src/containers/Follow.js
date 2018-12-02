import {connect} from 'react-redux';
import Follow from "../components/Follow";

const mapStateToProps = state => ({
    recommendList: state.RecommendReducer.recommendList,
});


const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Follow);