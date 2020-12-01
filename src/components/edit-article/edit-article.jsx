import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import CreateArticle from '../../containers/create-article-container/create-article-container';
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';

const EditArticle = ({ match, user, successEditing, asyncGetArticle, reset, asyncEditArticle }) => {
  const {
    params: { slug },
  } = match;

  useEffect(() => {
    asyncGetArticle(user.token, slug);
    return reset;
  }, [asyncGetArticle, reset, slug]);

  if (!Object.keys(user).length) {
    return <Redirect to="/sign-in" />;
  }

  return(
    <CreateArticle mission="edit" asyncEditArticle={asyncEditArticle} successEditing={successEditing}/>
  )
}

export default EditArticle;