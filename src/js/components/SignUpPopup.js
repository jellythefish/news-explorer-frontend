import Popup from './Popup';

export default class SignUpPopup extends Popup {
  constructor(element, openButton, closeButton, signInLink) {
    super(element, openButton, closeButton);
    this._signInPopup = null;
    this._signInLink = signInLink;
  }

  linkSignInPopup(signInPopup) {
    this._signInPopup = signInPopup;
    this._signInLink.addEventListener('click', this._signInPopup.open.bind(this._signInPopup));
    this._signInLink.addEventListener('click', this.close.bind(this));
  }
}
