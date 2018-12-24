import {connect} from 'react-redux';
import DetailTransaction from "../components/Modal/Detail-transaction";

const mapStateToProps = state => {
    return {
        transaction: state.transaction,
        activeUser:state.activeUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DetailTransaction);