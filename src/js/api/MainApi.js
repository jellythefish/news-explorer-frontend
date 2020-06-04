export default class MainApi {
  constructor() {
    this.initialURL = 'https://api.the-news-explorer.tk';
  }

  signUp(name, email, password) {
    return fetch(`${this.initialURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
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
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (document.cookie.toString().includes('jwt')) {
          if (res.ok) return res.json();
        }
        return Promise.reject(new Error(`Код: ${res.status}, Ошибка: ${res.message}`));
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

  getArticles() {}

  createArticle() {}

  removeArticle() {}
}