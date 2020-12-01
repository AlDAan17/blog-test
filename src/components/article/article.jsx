import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './article.scss';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { Popconfirm } from 'antd';
import UserDataWithAvatar from '../../utils/user-data-with-avatar';

const mapTags = (tags) => {
  return tags.map((tag) => <p className="article__tag">{tag}</p>);
};

const Article = (props) => {

  const {
    title,
    description,
    tagList,
    favoritesCount,
    author,
    createdAt,
    slug,
    body,
    showEditArticle,
    asyncDeleteArticle,
    favorited,
    articleFavoriteHandler,
    disableFavoritingArticle,
    errorFavoritingArticle,
  } = props;

  const [stateOfFavorites, setStateOfFavorites] = useState({liked: favorited, count:favoritesCount})
  const changeCheckbox = () => {
    if (disableFavoritingArticle) return;
    setStateOfFavorites((prevState) => ({liked: !prevState.liked, count: prevState.liked ? prevState.count - 1: prevState.count + 1}));
    articleFavoriteHandler(!stateOfFavorites.liked, slug);
  }

  useEffect(() => {
    if (errorFavoritingArticle && stateOfFavorites.liked !== favorited) {
      setStateOfFavorites((prevState) => ({liked: !prevState.liked, count: prevState.liked ? prevState.count - 1: prevState.count + 1}));
    }
  }, [errorFavoritingArticle, stateOfFavorites.liked, favorited])

  return (
    <div className="article">
      <div className="article__item">
        <div style={{marginRight:50}}>
          <div>
            <Link to={`/articles/${slug}`} className="article__head">{title}</Link>
            <label>
              <input className="heart__checkbox" type='checkbox' onChange={changeCheckbox}/>
              <span className={`heart ${stateOfFavorites.liked && 'heart__active'}`}/>
            </label>
            <label>{stateOfFavorites.count}</label>
          </div>
          <div>{mapTags(tagList)}</div>
          <div className="article__description">{description}
          </div>
        </div>
        <div className="article__container">
          <UserDataWithAvatar
            username={author.username}
            date={format(new Date(createdAt), 'LLLL d, y')}
            imageSrc={author.image}
          />
            {showEditArticle && (
              <div className="edit-buttons">
                <Popconfirm
                  placement="rightTop"
                  title="Are you sure to delete this article?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={asyncDeleteArticle}
                >
                  <button type="button" className="delete-article">delete</button>
                </Popconfirm>
                  <Link to={`/articles/${slug}/edit`} className="edit-article">edit</Link>
              </div>
            )}
        </div>
      </div>
      <Markdown>{body}</Markdown>
      {/* <p>{body}</p> */}
    </div>
  );
};

Article.defaultProps = {
  showEditArticle: false,
  asyncDeleteArticle: () => {},
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoritesCount: PropTypes.number.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    bio: PropTypes.string,
    image: PropTypes.string.isRequired,
    following: PropTypes.bool.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  showEditArticle: PropTypes.bool,
  articleFavoriteHandler: PropTypes.func.isRequired,
  asyncDeleteArticle: PropTypes.func,
  errorFavoritingArticle: PropTypes.bool.isRequired,
  disableFavoritingArticle: PropTypes.bool.isRequired,
};


export default Article;