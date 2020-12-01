import { connect } from 'react-redux';
import EditArticle from '../../components/edit-article';
import { asyncGetArticle, reset, asyncEditArticle } from '../../redux/action-creators';

const mapStateToProps = (state) => ({
  article: state.lastOpenedArticle,
  successGettingArticle: state.successGettingArticle,
  error: state.error,
  user: state.user,
  successEditing: state.successEditingArticle,
});

const mapDispatchToProps = {
  asyncGetArticle,
  reset,
  asyncEditArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);