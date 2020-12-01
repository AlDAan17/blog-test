import { connect } from 'react-redux';
import CreateArticle from '../../components/create-article';
import { asyncCreateArticle, reset } from '../../redux/action-creators';

const mapStateToProps = (state) => ({
  article: state.lastOpenedArticle,
  user: state.user,
  successCreating: state.successCreatingArticle,
  error: state.error,
});

const mapDispatchToProps = {
  asyncCreateArticle,
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
