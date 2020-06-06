/* eslint-disable no-unused-vars */
import MESSAGES from '../constants/messages';

export default class Form {
  constructor(form, errors, submitButton, api, header, popup, successPopup) {
    this._form = form;
    this._errorList = Array.from(errors);
    this._submitButton = submitButton;
    this._api = api;
    this._header = header;
    this._popup = popup;
    this._successPopup = successPopup;
    form.addEventListener('input', this._validateInputElement.bind(this));
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
        });
    } else if (this._form.name === 'sign-in') {
      this._setServerError('clear');
      this._setButtonState('loading');
      this._renderInput('block');
      const { email, password } = this._getInfo();
      this._api.signIn(email, password)
        .then((res) => {
          window.localStorage.setItem('jwt', res.jwt);
          this._clear();
          this._popup.close(event);
          this._header.render({ isLoggedIn: true, userName: res.name });
          this._renderInput('unblock');
        })
        .catch((error) => {
          this._setServerError(error, '/signin');
          this._setButtonState('enable');
          this._renderInput('unblock');
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
    this._setButtonState('disable');
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
