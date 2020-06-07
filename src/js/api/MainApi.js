export default class MainApi {
  constructor() {
    this.initialURL = 'https://api.the-news-explorer.tk';
    this.loggedIn = false;
  }

  signUp(email, password, name) {
    return fetch(`${this.initialURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode >= 400) {
          return Promise.reject(res.message);
        }
        return res;
      })
      .catch((err) => Promise.reject(err));
  }

  signIn(email, password) {
    return fetch(`${this.initialURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode >= 400) {
          return Promise.reject(res.message);
        }
        return res;
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        return data;
      })
      .catch((err) => Promise.reject(err));
  }

  getUserData() {
    return fetch(`${this.initialURL}/users/me`, {
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .catch((err) => Promise.reject(err));
  }

  logout() {
    return fetch(`${this.initialURL}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .then((data) => {
        localStorage.removeItem('token');
        return data;
      })
      .catch((err) => Promise.reject(err));
  }

  getArticles() {
    return fetch(`${this.initialURL}/articles`, {
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .catch((err) => Promise.reject(err));
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.initialURL}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword, title, text, date, source, link, image }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .catch((err) => Promise.reject(err));
  }

  removeArticle(articleId) {
    return fetch(`${this.initialURL}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .catch((err) => Promise.reject(err));
  }
}
