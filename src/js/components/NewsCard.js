/* eslint-disable class-methods-use-this */
import DATE_FORMATTERS from '../utils/formate-date';
import LINKS from '../constants/links';

export default class NewsCard {
  constructor(savedCards, articleKeywords, articleSource, articleTitle, articleText, articleUrl,
    articleImage, articleDate, api, type, articleId) {
    this.cardData = {
      keyword: articleKeywords,
      title: articleTitle,
      text: articleText,
      date: Date.parse(articleDate),
      source: articleSource,
      link: articleUrl,
      image: articleImage,
      savedCards: savedCards,
      id: articleId,
    };

    this.savedCards = savedCards;
    this._api = api;
    this._type = type;
    this._cardIcon = undefined;
    this._helper = undefined;
    this._date = undefined;
    this.saved = false;
    this.cardElement = this._create(articleKeywords, articleSource, articleTitle, articleText,
      articleUrl, articleImage, articleDate);
  }

  save(event) {
    this._api.createArticle(this.cardData.keyword, this.cardData.title, this.cardData.text,
      this.cardData.date, this.cardData.source, this.cardData.link, this.cardData.image)
      .then((res) => {
        this.saved = true;
        this.renderIcon(event);
        this.cardData.id = res.data._id;
      })
      .catch((err) => console.error(err));
  }

  remove(event) {
    this._api.removeArticle(this.cardData.id)
      .then((res) => {
        this.saved = false;
        this.renderIcon(event);
      })
      .catch((err) => console.error(err));
  }

  _create(articleKeywords, articleSource, articleTitle,
    articleText, articleUrl, articleImage, articleDate) {
    const card = document.createElement('li'); card.classList.add('article');

    const link = document.createElement('a'); link.classList.add('article__link');
    link.setAttribute('href', articleUrl); link.setAttribute('target', '_blank');

    const keyword = document.createElement('p'); keyword.classList.add('article__tag');
    keyword.textContent = articleKeywords;

    const cardImage = document.createElement('img'); cardImage.classList.add('article__image');
    if (!articleImage) {
      cardImage.setAttribute('src', LINKS.NOT_FOUND_PICTURE);
      this.cardData.image = LINKS.NOT_FOUND_PICTURE;
    } else {
      cardImage.setAttribute('src', articleImage);
    }
    cardImage.setAttribute('alt', 'Карточка');

    const saveButton = document.createElement('button'); saveButton.classList.add('article__icon');
    if (this._type !== 'default') {
      saveButton.classList.add('article__icon_delete');
    } else {
      if (this.savedCards) {
        const cardIsSaved = this.savedCards.find((elem) => elem.title === articleTitle);
        if (cardIsSaved) {
          this.cardData.id = cardIsSaved._id;
          saveButton.classList.add('article__icon_save-marked');
        } else {
          saveButton.classList.add('article__icon_save-normal');
        }
      }
    }
    this._cardIcon = saveButton;

    const helper = document.createElement('button'); helper.classList.add('article__icon-helper');
    if (this._type === 'default') helper.textContent = 'Войдите, чтобы сохранять статьи';
    else helper.textContent = 'Убрать из сохраненных';
    this._helper = helper;

    const textContent = document.createElement('div'); textContent.classList.add('article__text-content');

    const date = document.createElement('p'); date.classList.add('article__date');
    if (this._type === 'default') date.textContent = DATE_FORMATTERS.cardDate(new Date(articleDate));
    else date.textContent = articleDate;

    const title = document.createElement('h3'); title.classList.add('article__title');
    title.textContent = articleTitle;

    const text = document.createElement('p'); text.classList.add('article__text');
    text.textContent = articleText;

    const source = document.createElement('h4'); source.classList.add('article__source');
    source.textContent = articleSource;

    link.appendChild(title);
    textContent.appendChild(date); textContent.appendChild(link);
    textContent.appendChild(text); textContent.appendChild(source);
    if (this._type !== 'default') card.appendChild(keyword);
    card.appendChild(cardImage); card.appendChild(saveButton);
    if (!this._api.loggedIn) card.appendChild(helper); 
    card.appendChild(textContent);

    return card;
  }

  renderIcon(event) {
    if (!event.target) {
      const element = event.cardElement.querySelector('.article__icon');
      element.classList.remove('article__icon_save-normal');
      element.classList.add('article__icon_save-marked');
    } else {
      if (this.saved) {
        event.target.classList.remove('article__icon_save-normal');
        event.target.classList.add('article__icon_save-marked');
      } else {
        event.target.classList.add('article__icon_save-normal');
        event.target.classList.remove('article__icon_save-marked');
      }
    }
  }
}
