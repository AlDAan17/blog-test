import request from './request';

export function getArticlesFromAPI(token, page) {
  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token ? `Token ${token}` : '',
    },
  }
  return request(`https://conduit.productionready.io/api/articles?limit=10&offset=${(page - 1) * 10}`, options);
}

export function getArticleFromAPI(token, slug) {
  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token ? `Token ${token}` : '',
    },
  }
  return request(`https://conduit.productionready.io/api/articles/${slug}`, options);
}

export function registration(username, email, password) {
  const body = {
    'user': {
      'username': username,
      'email': email,
      'password': password,
    },
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  return request('https://conduit.productionready.io/api/users', options);
}

export function authentication(email, password) {
  const body = {
    'user': {
      'email': email,
      'password': password,
    },
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  return request('https://conduit.productionready.io/api/users/login', options);
}

export function editProfile(token, username, email, password, image) {
  const body = {
    user: {
      username,
      email,
      password,
      image,
    },
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  };
  return request('https://conduit.productionready.io/api/user', options);
}

export function createArticle(token, title, description, body, tagList) {
  const requestBody = {
    article: {
      title,
      description,
      body,
      tagList,
    },
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(requestBody),
  };
  return request('https://conduit.productionready.io/api/articles', options);
}

export function editArticle(token, title, description, body, tagList, slug) {
  const requestBody = {
    article: {
      title,
      description,
      body,
      tagList,
    },
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(requestBody),
  };
  return request(`https://conduit.productionready.io/api/articles/${slug}`, options);
}

export function deleteArticle(token, slug) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  };
  return request(`https://conduit.productionready.io/api/articles/${slug}`, options);
}

export function estimateArticle(token, slug, isFavorite) {
  const options = {
    method: isFavorite ? "POST" : "DELETE",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  }
  return request(`https://conduit.productionready.io/api/articles/${slug}/favorite`, options);
}