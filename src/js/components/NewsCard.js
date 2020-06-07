/* eslint-disable class-methods-use-this */
import DATE_FORMATTERS from '../utils/formate-date';

export default class NewsCard {
  constructor(articleSource, articleTitle, articleText, articleUrl, articleImage, articleDate, api) {
    this.cardElement = this._create(articleSource, articleTitle, articleText,
      articleUrl, articleImage, articleDate);
    this._cardIcon = undefined;
    this._helper = undefined;
    this._date = undefined;
    this._saved = false;
    this._api = api;
  }

  save(event) {
    if (!this._saved) {
      this._api.createArticle()
        .then((res) => {
          this.renderIcon(event);
        })
        .catch((err) => console.error(err));
    } else {
      this._api.removeArticle()
        .then((res) => {
          this._renderIcon(event);
        })
        .catch((err) => console.error(err));
    }


  }

  _create(articleSource, articleTitle, articleText, articleUrl, articleImage, articleDate) {
    const card = document.createElement('li'); card.classList.add('article');

    const link = document.createElement('a'); link.classList.add('article__link');
    link.setAttribute('href', articleUrl); link.setAttribute('target', '_blank');

    const cardImage = document.createElement('img'); cardImage.classList.add('article__image');
    cardImage.setAttribute('src', articleImage); cardImage.setAttribute('alt', 'Карточка');

    const saveButton = document.createElement('button'); saveButton.classList.add('article__icon');
    saveButton.classList.add('article__icon_save-normal');
    this._cardIcon = saveButton;
    saveButton.addEventListener('click', this.save.bind(this));

    const helper = document.createElement('button'); helper.classList.add('article__icon-helper');
    helper.textContent = 'Войдите, чтобы сохранять статьи';
    this._helper = helper;

    const textContent = document.createElement('div'); textContent.classList.add('article__text-content');

    const date = document.createElement('p'); date.classList.add('article__date');
    date.textContent = DATE_FORMATTERS.cardDate(new Date(articleDate));

    const title = document.createElement('h3'); title.classList.add('article__title');
    title.textContent = articleTitle;

    const text = document.createElement('p'); text.classList.add('article__text');
    text.textContent = articleText;

    const source = document.createElement('h4'); source.classList.add('article__source');
    source.textContent = articleSource;

    link.appendChild(title);
    textContent.appendChild(date); textContent.appendChild(link);
    textContent.appendChild(text); textContent.appendChild(source);
    card.appendChild(cardImage); card.appendChild(saveButton);
    card.appendChild(helper); card.appendChild(textContent);

    return card;
  }

  renderIcon(event) {
    this._saved = !this._saved;
    event.target.classList.toggle('article__icon_save-normal');
    event.target.classList.toggle('article__icon_save-marked');
  }
}
