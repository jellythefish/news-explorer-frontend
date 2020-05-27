export default class Popup {
  constructor(element, openButton, closeButton) {
    this._element = element;
    this._closeButton = closeButton;
    if (openButton !== undefined) openButton.addEventListener('click', this.open.bind(this));
    closeButton.addEventListener('click', this.close.bind(this));
    this._element.addEventListener('click', this._backgroundCloseClick.bind(this));
    document.addEventListener('keydown', this._escClosePress.bind(this));
  }

  open() {
    this._element.classList.remove('popup_hidden');
    this._element.classList.add('popup_visible');
  }

  close() {
    this._element.classList.add('popup_hidden');
    this._element.classList.remove('popup_visible');
  }

  _backgroundCloseClick(event) {
    if (event.target.classList.contains('popup')) this.close();
  }

  _escClosePress(event) {
    if (event.key === 'Escape' && this._element.classList.contains('popup_visible')) this.close();
  }
}
