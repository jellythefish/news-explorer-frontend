export default class Header {
  constructor(authButton, logoutButton, menuLogoutButton, savedNewsLink, popup, api) {
    this._authButton = authButton;
    this._logoutButton = logoutButton;
    this._savedNewsLink = savedNewsLink;
    this._headerPopup = popup;
    this._api = api;
    logoutButton.addEventListener('click', this._logout.bind(this));
    menuLogoutButton.addEventListener('click', this._logout.bind(this));
  }

  render(props) { // props.isLoggedIn, props.userName
    if (props.savedNews) {
      this._logoutButton.children[0].textContent = props.userName;
    } else if (props.isLoggedIn) {
      this._authButton.classList.remove('header__button_visible');
      this._authButton.classList.add('header__button_hidden');
      this._logoutButton.classList.add('header__button_visible');
      this._logoutButton.classList.remove('header__button_hidden');
      this._logoutButton.children[0].textContent = props.userName;
      this._savedNewsLink.classList.add('header__link-wrapper_visible');
      this._savedNewsLink.classList.remove('header__link-wrapper_hidden');
    } else {
      this._authButton.classList.remove('header__button_hidden');
      this._authButton.classList.add('header__button_visible');
      this._logoutButton.classList.add('header__button_hidden');
      this._logoutButton.classList.remove('header__button_visible');
      this._savedNewsLink.classList.add('header__link-wrapper_hidden');
      this._savedNewsLink.classList.remove('header__link-wrapper_visible');
    }
    this._headerPopup.renderState(props);
  }

  _logout() {
    return this._api.logout()
      .then((res) => window.location.reload())
      .catch((err) => console.error(err));
  }
}
