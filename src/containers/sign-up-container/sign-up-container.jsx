import { connect } from 'react-redux';
import SignUp from "../../components/sign-up";
import { asyncRegistration } from '../../redux/action-creators'

const mapStateToProps = (state) => ({
  serverValidations: state.serverValidations,
  user: state.user,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => ({
  asyncRegistration: (username, email, password) => dispatch(asyncRegistration(username, email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);