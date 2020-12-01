import { connect } from 'react-redux';
import EditProfile from '../../components/edit-profile';
import { asyncEditProfile } from '../../redux/action-creators';

const mapStateToProps = (state) => ({
    user: state.user,
    serverValidations: state.serverValidations,
    successEditing: state.successEditingProfile,
    error: state.error,
});

const mapDispatchToProps = {
    asyncEditProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);