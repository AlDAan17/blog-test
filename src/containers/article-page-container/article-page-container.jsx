import { connect } from 'react-redux';
import {asyncGetArticle, asyncDeleteArticle, asyncEstimateArticle } from '../../redux/action-creators';
import ArticlePage from '../../components/article-page';

const mapStateToProps = (state) => ({
  user: state.user,
  article: state.lastOpenedArticle,
  successGettingArticle: state.successGettingArticle,
  error: state.error,
  deletingArticle: state.deletingArticle,
  errorFavoritingArticle: state.errorFavoritingArticle,
});

const mapDispatchToProps = {
  asyncGetArticle,
  asyncDeleteArticle,
  asyncEstimateArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
