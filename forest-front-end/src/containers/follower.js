import {connect} from 'react-redux';
import FollowerList from '../components/follower-list'

const mapStateToProps = state => {
    return {
        list_follower: state.follower.listFollower
    }
}

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);