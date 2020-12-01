import { connect } from 'react-redux';
import ArticlesList from '../../components/articles-list';
import { asyncDeleteArticle, asyncEstimateArticle, asyncGetArticles } from '../../redux/action-creators';

const mapStateToProps = (state) => ({
  user: state.user,
  articles: state.data.articles,
  page: state.data.page,
  successfullDownload: state.successfullDownload,
  error:state.error,
  errorFavoritingArticle: state.errorFavoritingArticle,
})

const mapDispatchToProps = {
  asyncGetArticles,
  asyncDeleteArticle,
  asyncEstimateArticle,
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);