export default class NewsApi {
  constructor() {
    this._deployURL = 'https://praktikum.tk/news/v2/everything';
    this._localhostURL = 'https://newsapi.org/v2/everything';
    this._apiKey = 'e12a838c71604d7488f2703e9aa40b3b';
    this._pageSize = 100;
  }

  getNews(keyword, from, to) {
    return fetch(`${this._deployURL}?q=${encodeURI(keyword)}&apiKey=${this._apiKey}&language=ru&from=${from}&to=${to}&pageSize=${this._pageSize}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Код ошибки: ${res.statusCode}, Сообщение: ${res.statusText}`));
      })
      .then((res) => {
        if (res.totalResults > 0) {
          return res;
        }
        return Promise.reject('По запросу ничего найдено');
      })
      .catch((err) => Promise.reject(err));
  }
}
