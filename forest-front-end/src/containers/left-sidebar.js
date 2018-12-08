import {connect} from 'react-redux';
import LeftSidebar from '../components/left-sidebar'

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);