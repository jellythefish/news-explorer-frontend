export default class MainApi {
  constructor() {
    this.initialURL = 'https://api.the-news-explorer.tk';
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Код: ${res.status}, Ошибка: ${res.message}`));
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Код: ${res.status}, Ошибка: ${res.message}`));
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

  getArticles() {}

  createArticle() {}

  removeArticle() {}
}