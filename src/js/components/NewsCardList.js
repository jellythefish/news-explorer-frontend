import MESSAGES from '../constants/messages';

export default class NewsCardList {
  constructor(resultsContainer, articlesContainer, preloadingContainer, notFoundContainer,
    showMoreButton, errorElement, dependencies) {
    this._articlesContainer = articlesContainer;
    this._resultsContainer = resultsContainer;
    this._preloadingContainer = preloadingContainer;
    this._notFoundContainer = notFoundContainer;
    this._showMoreButton = showMoreButton;
    [this._errorElement, this._errorTitleElement] = errorElement;
    this._jsonArray = undefined;
    this._cardClass = dependencies.newsCard;
    this._cardList = [];
    this._index = 0;
    showMoreButton.addEventListener('click', this.renderResults.bind(this));
  }

  addCards(json) {
    this._jsonArray = json.articles;
    this._cardList = [];
    this._articlesContainer.textContent = '';
  }

  renderResults(event, state = 'enable') {
    if (state === 'enable') {
      this._resultsContainer.classList.add('results__container_visible');
      this._resultsContainer.classList.remove('results__container_hidden');
      for (let i = this._index; i < this._index + 3 && i < this._jsonArray.length; i += 1) {
        const data = this._jsonArray[i];
        const newsCard = new this._cardClass(data.source.name, data.title, data.description,
          data.url, data.urlToImage, data.publishedAt);
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
