import MESSAGES from '../constants/messages';
import DATE_FORMATTERS from '../utils/formate-date';

export default class NewsCardList {
  constructor(resultsContainer, articlesContainer, preloadingContainer, notFoundContainer,
    showMoreButton, errorElement, api, dependencies, type) {
    this._articlesContainer = articlesContainer;
    this._resultsContainer = resultsContainer;
    this._preloadingContainer = preloadingContainer;
    this._notFoundContainer = notFoundContainer;
    this._showMoreButton = showMoreButton;
    if (errorElement) [this._errorElement, this._errorTitleElement] = errorElement;
    this._jsonArray = undefined;
    this._cardClass = dependencies.newsCard;
    this._cardList = [];
    this.savedCards = [];
    this._api = api;
    this._type = type;
    this.keywords = {};
    this._index = 0;
    this._keywords = undefined;
    if (showMoreButton) showMoreButton.addEventListener('click', this.renderResults.bind(this));
    articlesContainer.addEventListener('click', this.cardHandler.bind(this));
  }

  countKeywords() {
    this.savedCards.forEach((card) => {
      if (!this.keywords[card.keyword]) {
        this.keywords[card.keyword] = 1;
      } else {
        this.keywords[card.keyword] += 1;
      }
    })
    return this.keywords;
  }

  renderHelpers() {
    this._cardList.forEach((card) => {
      if (this._api.loggedIn) {
        card.cardElement.querySelector('.article__icon-helper').remove();
        const cardTitle = card.cardData.title;
        const cardIsSaved = this.savedCards.find((elem) => elem.title === cardTitle);
        if (cardIsSaved) {
          card.cardData.id = cardIsSaved._id;
          card.saved = true;
          card.renderIcon(card);
        }
      }
    })
  }

  cardHandler(event) {
    const currentCard = this._cardList.find((elem) => elem.cardElement === event.target.closest('.article'));
    if (event.target.classList.contains('article__icon_save-normal')) {
      currentCard.save(event);
    } else if (event.target.classList.contains('article__icon_save-marked')) {
      currentCard.remove(event);
    } else if (event.target.classList.contains('article__icon_delete')) {
      currentCard.remove(event);
      currentCard.cardElement.remove();
    }
  }

  addCards(json, keywords) {
    this._jsonArray = json.articles;
    this._keywords = keywords;
    this._cardList = [];
    this._articlesContainer.textContent = '';
  }

  renderSavedNews() {
    this.savedCards.forEach((card) => {
      const newsCard = new this._cardClass(this.savedCards, card.keyword, card.source, card.title,
        card.text, card.link, card.image, DATE_FORMATTERS.cardDate(new Date(Number.parseInt(card.date))), 
        this._api, this._type, card._id);
      this._articlesContainer.appendChild(newsCard.cardElement);
      this._cardList.push(newsCard);
    })
  }

  renderResults(event, state = 'enable') {
    if (state === 'enable') {
      this._resultsContainer.classList.add('results__container_visible');
      this._resultsContainer.classList.remove('results__container_hidden');
      for (let i = this._index; i < this._index + 3 && i < this._jsonArray.length; i += 1) {
        const data = this._jsonArray[i];
        const newsCard = new this._cardClass(this.savedCards, this._keywords, data.source.name, data.title,
          data.description, data.url, data.urlToImage, data.publishedAt, this._api, this._type);
        this._articlesContainer.appendChild(newsCard.cardElement);
        this._cardList.push(newsCard);
      }
      this._index += 3;
      if (this._index >= this._jsonArray.length) {
        this.renderShowMoreButton('disable');
      }
    } else {
      this._resultsContainer.classList.remove('results__container_visible');
      this._resultsContainer.classList.add('results__container_hidden');
      this._index = 0;
    }
  }

  renderLoader(state) {
    if (state === 'enable') {
      this._preloadingContainer.classList.add('results__preloading_visible');
      this._preloadingContainer.classList.remove('results__preloading_hidden');
    } else {
      this._preloadingContainer.classList.remove('results__preloading_visible');
      this._preloadingContainer.classList.add('results__preloading_hidden');
    }
  }

  renderError(state) {
    if (state === 'enable') {
      this._errorElement.textContent = MESSAGES.NOT_FOUND_ERROR;
      this._errorTitleElement.textContent = MESSAGES.NOT_FOUND_TITLE_ERROR;
      this._notFoundContainer.classList.add('results__not-found_visible');
      this._notFoundContainer.classList.remove('results__not-found_hidden');
    } else if (state === 'error') {
      this._errorElement.textContent = MESSAGES.INTERNAL_ERROR;
      this._errorTitleElement.textContent = MESSAGES.UNKNOWN_ERROR;
      this._notFoundContainer.classList.add('results__not-found_visible');
      this._notFoundContainer.classList.remove('results__not-found_hidden');
    } else {
      this._notFoundContainer.classList.remove('results__not-found_visible');
      this._notFoundContainer.classList.add('results__not-found_hidden');
    }
  }

  renderShowMoreButton(state) {
    if (state === 'enable') {
      this._showMoreButton.classList.remove('results__more_hidden');
      this._showMoreButton.classList.add('results__more_visible');
    } else {
      this._showMoreButton.classList.add('results__more_hidden');
      this._showMoreButton.classList.remove('results__more_visible');
    }
  }
}
