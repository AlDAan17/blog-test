import { connect } from 'react-redux';
import SignIn from '../../components/sign-in';
import { asyncAuthentication } from '../../redux/action-creators';

const mapStateToProps = (state) => ({
    serverValidations: state.serverValidations,
    user: state.user,
    error: state.error,
})

const mapDispatchToProps = (dispatch) => ({
    asyncAuthentication: (email, password) => dispatch(asyncAuthentication(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);