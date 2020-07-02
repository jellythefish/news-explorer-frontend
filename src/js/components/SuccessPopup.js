import Popup from './Popup';

export default class SuccessPopup extends Popup {
  constructor(element, openButtons, closeButton, signInLink) {
    super(element, openButtons, closeButton);
    this._signInPopup = null;
    this._signInLink = signInLink;
  }

  linkSignInPopup(signInPopup) {
    this._signInPopup = signInPopup;
    this._signInLink.addEventListener('click', this._signInPopup.open.bind(this._signInPopup));
    this._signInLink.addEventListener('click', this.close.bind(this));
  }
}
