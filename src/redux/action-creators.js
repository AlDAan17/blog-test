import {
  ARTICLES_RECEIVED,
  ARTICLES_NOT_RECEIVED,
  AUTH_COMPLETED,
  LOG_OUT,
  SERVER_VALIDATIONS_RECEIVED,
  PROFILE_NOT_EDITED,
  PROFILE_EDITED,
  RESET,
  ARTICLE_CREATED,
  ARTICLE_NOT_CREATED,
  ARTICLE_EDITED,
  ARTICLE_NOT_EDITED,
  ARTICLE_RECEIVED,
  ARTICLE_NOT_RECEIVED,
  ARTICLE_DELETED,
  ARTICLE_NOT_DELETED,
  FAVORITE_ARTICLE_NOT_ADDED,
  AUTH_NOT_COMPLETED, FAVORITE_ARTICLE_RESET,
} from './action-types';
import {
  getArticlesFromAPI,
  registration,
  authentication,
  editProfile,
  createArticle,
  editArticle, getArticleFromAPI, deleteArticle, estimateArticle,
} from '../services/article-service';

export const reset = () => ({
  type: RESET,
});

const articlesReceived = (articles, page) => ({
  type: ARTICLES_RECEIVED,
  articles,
  page
})

const articlesNotReceived = () => ({
  type: ARTICLES_NOT_RECEIVED,
})

export const asyncGetArticles = (token, page) => {
  return async function inside(dispatch) {
    try {
      dispatch(reset());
      const response = await getArticlesFromAPI(token, page);
      const {articles} = response;
      dispatch(articlesReceived(articles, page));
    } catch (error) {
      dispatch(articlesNotReceived());
    }
  }
}
const articleReceived = (article) => ({
  type: ARTICLE_RECEIVED,
  article,
});

const articleNotReceived = () => ({
  type: ARTICLE_NOT_RECEIVED,
});

export const asyncGetArticle = (token, slug) => {
  return async function inside(dispatch) {
    try {
      dispatch(reset());
      const response = await getArticleFromAPI(token, slug);
      const { article } = response;
      dispatch(articleReceived(article));
    } catch (error) {
      dispatch(articleNotReceived());
    }
  };
};

const authCompleted = (user) => ({
  type: AUTH_COMPLETED,
  user,
})
const authNotCompleted = (user) => ({
  type: AUTH_NOT_COMPLETED,
  user,
})

const serverValidationsReceived = (text) => ({
  type: SERVER_VALIDATIONS_RECEIVED,
  text,
})

export const asyncRegistration = (username, email, password) => {
  return async function inside(dispatch) {
    try {
      dispatch(reset());
      const response = await registration(username, email, password);
      const { user, errors } = response;
      if (errors) {
        const part1 = errors.username ? 'Username has already been taken' : '';
        const part2 = errors.email ? 'Email has already been taken' : '';
        const text = `${part1}\n${part2}`;
        dispatch(serverValidationsReceived(text));
      } else {
        dispatch(authCompleted(user));
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    } catch(error) {
      dispatch(authNotCompleted());
    }
  }
}

export const asyncAuthentication = (email, password) => {
  return async function inside(dispatch) {
    try {
      dispatch(reset());
      const response = await authentication(email, password);
      const { user, errors } = response;
      if (errors) {
        const text = "Email or password is invalid";
        dispatch(serverValidationsReceived(text));
      } else {
        dispatch(authCompleted(user));
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    } catch(error) {
      dispatch(authNotCompleted());
    }
  }
}

const logOut = () => ({
  type: LOG_OUT,
})

export const logOutAndRemoveStorage = () => {
  return async function inside(dispatch) {
    sessionStorage.removeItem("user");
    dispatch(logOut());
  }
}

const profileEdited = (user) => ({
  type: PROFILE_EDITED,
  user,
});


const profileNotEdited = () => ({
  type: PROFILE_NOT_EDITED,
});

export const asyncEditProfile = (token, username, email, password, image) => {
  return async function inside(dispatch) {
    try {
      const response = await editProfile(token, username, email, password, image);
      const { user, errors } = response;
      if (errors) {
        dispatch(reset());
        const part1 = errors.username ? 'This username is busy' : '';
        const part2 = errors.email ? 'This email is busy' : '';
        const text = `${part1}\n${part2}`;
        dispatch(serverValidationsReceived(text));
      } else {
        dispatch(profileEdited(user));
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      dispatch(profileNotEdited());
    }
  };
};

const articleCreated = () => ({
  type: ARTICLE_CREATED,
});

const articleNotCreated = () => ({
  type: ARTICLE_NOT_CREATED,
});

export const asyncCreateArticle = (token, title, description, body, tagList) => {
  return async function inside(dispatch) {
    try {
      dispatch(reset());
      await createArticle(token, title, description, body, tagList);
      dispatch(articleCreated());
    } catch (error) {
      dispatch(articleNotCreated());
    }
  };
};

const articleEdited = () => ({
  type: ARTICLE_EDITED,
})

const articleNotEdited = () => ({
  type: ARTICLE_NOT_EDITED,
})

export const asyncEditArticle = (token, title, description, body, tagList, slug) => {
  return async function inside(dispatch) {
    try {
      dispatch(reset());
      await editArticle(token, title, description, body, tagList, slug);
      dispatch(articleEdited());
    } catch(error) {
      dispatch(articleNotEdited());
    }
  }
}

const articleDeleted = () => ({
  type: ARTICLE_DELETED,
})

const articleNotDeleted = () => ({
  type: ARTICLE_NOT_DELETED,
})

export const asyncDeleteArticle = (token, slug) =>{
  return async function inside(dispatch){
    try{
      await deleteArticle(token, slug);
      dispatch (articleDeleted());
    }catch (err) {
      dispatch(articleNotDeleted());
    }
  }
}

const favoriteArticleNotAdded = () => ({
  type: FAVORITE_ARTICLE_NOT_ADDED,
})

const favoriteArticleReset = () => ({
  type: FAVORITE_ARTICLE_RESET,
})

export const asyncEstimateArticle = (token, slug, isFavorite) => {
  return async function inside(dispatch) {
    try {
      dispatch(favoriteArticleReset());
      await estimateArticle(token, slug, isFavorite);

    } catch(error) {
      dispatch(favoriteArticleNotAdded());
    }
  }
}