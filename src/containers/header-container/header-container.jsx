import { connect } from 'react-redux';
import Header from '../../components/header';
import { logOutAndRemoveStorage } from '../../redux/action-creators';

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
    logOutAndRemoveStorageWithDispatch: () => dispatch(logOutAndRemoveStorage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);