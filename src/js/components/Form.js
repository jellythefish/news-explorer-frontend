/* eslint-disable no-unused-vars */
import MESSAGES from '../constants/messages';
import DATE_FORMATTERS from '../utils/formate-date';

export default class Form {
  constructor(form, submitButton, api, cardList, errors, header, popup, successPopup) {
    this._form = form;
    this._errorList = errors ? Array.from(errors) : undefined;
    this._submitButton = submitButton;
    this._api = api;
    this._header = header;
    this._popup = popup;
    this._successPopup = successPopup;
    this._cardList = cardList;
    if (errors) form.addEventListener('input', this._validateInputElement.bind(this));
    form.addEventListener('submit', this._submitForm.bind(this));
  }

  _setServerError(error) {
    const currentError = this._errorList.find((elem) => elem.getAttribute('data-for-element') === 'common');
    if (error === 'clear') {
      currentError.textContent = '';
    } else if (error) {
      currentError.textContent = error;
    } else {
      currentError.textContent = MESSAGES.SOMETHING_WRONG;
    }
    this._setButtonState('enable');
  }

  _validateInputElement(event) {
    const currentInput = event.target;
    const currentError = this._errorList.find((error) => error.getAttribute('data-for-element') === currentInput.name);
    if (currentInput.validity.valueMissing) {
      currentError.textContent = MESSAGES.REQUIRED_FIELD;
    } else if (currentInput.validity.tooShort || currentInput.validity.tooLong) {
      currentError.textContent = MESSAGES.LENGTH_ERROR;
    } else if (currentInput.name === 'username' && !currentInput.validity.valid) {
      currentError.textContent = MESSAGES.INVALID_NAME;
    } else if (currentInput.name === 'email' && !currentInput.validity.valid) {
      currentError.textContent = MESSAGES.INVALID_EMAIL;
    } else if (currentInput.name === 'password' && !currentInput.validity.valid) {
      currentError.textContent = MESSAGES.INVALID_PASSWORD;
    } else if (currentError) {
      currentError.textContent = '';
    }
    this._validateForm();
  }

  _submitForm(event) {
    event.preventDefault();
    if (this._form.name === 'sign-up') {
      this._setServerError('clear');
      this._setButtonState('loading');
      this._renderInput('block');
      const { username, email, password } = this._getInfo();
      this._api.signUp(email, password, username)
        .then((res) => {
          this._clear();
          this._popup.close(event);
          this._successPopup.open(event);
          this._renderInput('unblock');
        })
        .catch((error) => {
          this._setServerError(error, '/signup');
          this._setButtonState('enable');
          this._renderInput('unblock');
          console.error(error);
        });
    } else if (this._form.name === 'sign-in') {
      this._setServerError('clear');
      this._setButtonState('loading');
      this._renderInput('block');
      const { email, password } = this._getInfo();
      this._api.signIn(email, password)
        .then((res) => {
          window.localStorage.setItem('jwt', res.jwt);
          this._api.loggedIn = true;
          this._clear();
          this._popup.close(event);
          this._header.render({ isLoggedIn: true, userName: res.name });
          this._renderInput('unblock');
          return this._api.getArticles();
        })
        .then((res) => {
          this._cardList.savedCards = res.data;
          return this._cardList.renderHelpers();
        })
        .catch((error) => {
          this._setServerError(error, '/signin');
          this._setButtonState('enable');
          this._renderInput('unblock');
          console.error(error);
        });
    } else if (this._form.name === 'search') {
      this._renderInput('block');
      this._cardList.renderResults(undefined, 'disable');
      this._cardList.renderError('disable');
      this._cardList.renderLoader('enable');
      this._cardList.renderShowMoreButton('enable');
      const keywords = this._form.children[0].value;
      const nowDate = new Date();
      const from = DATE_FORMATTERS.nthDaysAgoFromDate(nowDate, 7);
      const to = DATE_FORMATTERS.apiDate(nowDate);
      this._api.getNews(keywords, from, to)
        .then((res) => {
          this._renderInput('unblock');
          this._cardList.renderLoader('disable');
          this._cardList.addCards(res, keywords);
          this._cardList.renderResults(undefined, 'enable');
        })
        .catch((err) => {
          this._renderInput('unblock');
          this._cardList.renderLoader('disable');
          this._cardList.renderResults(undefined, 'disable');
          if (typeof err !== 'string') this._cardList.renderError('error');
          else this._cardList.renderError('enable');
          console.error(err);
        });
    }
  }

  _validateForm() {
    const allFieldsValid = Array.from(this._form.elements)
      .every((element) => element.validity.valid);
    if (allFieldsValid) {
      this._setButtonState('enable');
    } else {
      this._setButtonState('disable');
    }
  }

  _clear() {
    this._form.reset();
    if (!this._submitButton.classList.contains('search__button')) this._setButtonState('disable');
  }

  _getInfo() {
    const fields = {};
    this._form.elements.forEach((element) => {
      if (element.localName !== 'input') return;
      fields[element.getAttribute('name')] = element.value;
    });
    return fields;
  }

  _setButtonState(state) {
    if (this._form.name === 'sign-in') this._submitButton.textContent = 'Войти';
    if (this._form.name === 'sign-up') this._submitButton.textContent = 'Зарегистрироваться';
    if (state === 'enable') {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove('popup__button_disabled');
      this._submitButton.classList.add('popup__button_enabled');
    } else if (state === 'disable') {
      this._submitButton.setAttribute('disabled', 'true');
      this._submitButton.classList.add('popup__button_disabled');
      this._submitButton.classList.remove('popup__button_enabled');
    } else if (state === 'loading') {
      this._submitButton.textContent = 'Загрузка...';
      this._submitButton.setAttribute('disabled', 'true');
      this._submitButton.classList.add('popup__button_disabled');
      this._submitButton.classList.remove('popup__button_enabled');
    }
  }

  _renderInput(state) {
    if (state === 'block') {
      this._form.elements.forEach((element) => {
        element.setAttribute('disabled', 'true');
      });
    } else {
      this._form.elements.forEach((element) => {
        element.removeAttribute('disabled');
      });
    }
  }
}
