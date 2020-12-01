import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import Article from '../article';

const isMyArticle = (authorName) => {
  const myUserName = JSON.parse(sessionStorage.getItem('user'))?.username;
  return authorName === myUserName;
};

const ArticlePage = (props) => {
  const { user,
    match,
    article,
    successGettingArticle,
    error,
    deletingArticle,
    asyncDeleteArticle,
    asyncGetArticle,
    asyncEstimateArticle,
    errorFavoritingArticle,
  } = props;
  const { slug } = match.params;

  useEffect(() => {
    asyncGetArticle(user.token, slug);
  }, [user.token, asyncGetArticle, slug]);

  if (error) {
    return <Alert className="alert" message="Article does not exist" type="error" />;
  }

  if (!successGettingArticle) {
    return <LoadingOutlined className="spinner" spin/>;
  }

  if (deletingArticle) {
    return <Redirect to="/"/>;
  }

  const articleFavoriteHandler = user.token ? (isFavorite, articleSlug) => asyncEstimateArticle(user.token, articleSlug, isFavorite) : () => {};

  const {
    author: { username },
  } = article;


  return <Article {...article} isList={false}
                  showEditArticle={isMyArticle(username)}
                  asyncDeleteArticle={() => asyncDeleteArticle(user.token, slug)}
                  deletingArticle={deletingArticle}
                  articleFavoriteHandler={articleFavoriteHandler}
                  disableFavoritingArticle={!user.token}
                  errorFavoritingArticle={errorFavoritingArticle}
  />;
};

// ArticlePage.defaultProps = {
//   article: PropTypes.shape({
//     slug: ''
//   }),
// }

ArticlePage.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  deletingArticle: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  successGettingArticle: PropTypes.bool.isRequired,
  asyncDeleteArticle: PropTypes.func.isRequired,
  asyncGetArticle: PropTypes.func.isRequired,
  asyncEstimateArticle: PropTypes.func.isRequired,
  errorFavoritingArticle: PropTypes.bool.isRequired,
};

export default ArticlePage;