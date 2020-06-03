export default class Header {
  constructor(authButton, logoutButton, savedNewsLink, popup) {
    this._authButton = authButton;
    this._logoutButton = logoutButton;
    this._savedNewsLink = savedNewsLink;
    this._headerPopup = popup;
  }

  render(props) { // props.isLoggedIn, props.userName
    if (props.isLoggedIn) {
      this._authButton.classList.add('header__button_visible');
      this._authButton.classList.remove('header__button_hidden');
      this._logoutButton.classList.add('header__button_visible');
      this._logoutButton.classList.remove('header__button_hidden');
      this._logoutButton.textContent = props.UserName;
      this._savedNewsLink.classList.add('header__link-wrapper_visible');
      this._savedNewsLink.classList.remove('header__link-wrapper_hidden');
      this._headerPopup.renderState(props);
    } else {
      this._authButton.classList.add('header__button_hidden');
      this._authButton.classList.remove('header__button_visible');
      this._logoutButton.classList.add('header__button_hidden');
      this._logoutButton.classList.remove('header__button_visible');
      this._savedNewsLink.classList.add('header__link-wrapper_hidden');
      this._savedNewsLink.classList.remove('header__link-wrapper_visible');
      this._headerPopup.renderState(props);
    }
  }
}
