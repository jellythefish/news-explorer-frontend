import Popup from './Popup';

export default class SignInPopup extends Popup {
  constructor(element, openButtons, closeButton, signUpLink) {
    super(element, openButtons, closeButton);
    this._signUpPopup = null;
    this._signUpLink = signUpLink;
  }

  linkSignUpPopup(signUpPopup) {
    this._signUpPopup = signUpPopup;
    this._signUpLink.addEventListener('click', this._signUpPopup.open.bind(this._signUpPopup));
    this._signUpLink.addEventListener('click', this.close.bind(this));
  }
}
