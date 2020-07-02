/* eslint-disable class-methods-use-this */
import SELECTORS from '../constants/selectors';

export default class Popup {
  constructor(element, openButtons, closeButton, menuPopup) {
    this._element = element;
    this._closeButton = closeButton;
    this._popupModifier = menuPopup ? 'header__popup' : 'popup';
    if (openButtons !== undefined) openButtons.forEach((button) => button.addEventListener('click', this.open.bind(this)));
    closeButton.addEventListener('click', this.close.bind(this));
    this._element.addEventListener('click', this._backgroundCloseClick.bind(this));
    document.addEventListener('keydown', this._escClosePress.bind(this));
    document.addEventListener('click', this._backgroundCloseClick.bind(this));
  }

  open(event) {
    this._element.classList.remove(`${this._popupModifier}_hidden`);
    this._element.classList.add(`${this._popupModifier}_visible`);
    this._render(event);
  }

  close(event) {
    this._element.classList.add(`${this._popupModifier}_hidden`);
    this._element.classList.remove(`${this._popupModifier}_visible`);
    this._render(event);
  }

  _backgroundCloseClick(event) {
    if (event.target.classList.contains('popup')) 
      this.close(event);
    else if (!((event.target.closest('div') && event.target.closest('div').classList.contains('header__popup'))  
    || event.target.classList.contains('header__menu')) && this._element.classList.contains('header__popup_visible')) 
      this.close(event);
  }

  _escClosePress(event) {
    if (event.key === 'Escape' && this._element.classList.contains('popup_visible')) this.close(event);
  }

  _render(event) {
    const { classList } = event.target;
    if (classList.contains('js-button-menu-auth')) {
      event.target.closest('div').classList.add('header__popup_hidden');
      event.target.closest('div').classList.remove('header__popup_visible');
      SELECTORS.OPEN_BUTTON_MENU.classList.add('header__menu_hidden');
      SELECTORS.OPEN_BUTTON_MENU.classList.remove('header__menu_visible');
    } else if (classList.contains('popup') || classList.contains('popup__close') || event.key === 'Escape' || event.target.name === 'sign-in') {
      SELECTORS.OPEN_BUTTON_MENU.classList.remove('header__menu_hidden');
      SELECTORS.OPEN_BUTTON_MENU.classList.add('header__menu_visible');
    }
  }

  renderState(props) {
    if (props.savedNews) {
      SELECTORS.LOGOUT_BUTTON_MENU.children[0].textContent = props.userName;
    } else if (props.isLoggedIn) {
      SELECTORS.AUTH_BUTTON_MENU.classList.remove('header__button_visible');
      SELECTORS.AUTH_BUTTON_MENU.classList.add('header__button_hidden');
      SELECTORS.LOGOUT_BUTTON_MENU.classList.add('header__button_visible');
      SELECTORS.LOGOUT_BUTTON_MENU.classList.remove('header__button_hidden');
      SELECTORS.LOGOUT_BUTTON_MENU.children[0].textContent = props.userName;
      SELECTORS.SAVEDNEWS_LINK_MENU.classList.add('header__link-wrapper_visible');
      SELECTORS.SAVEDNEWS_LINK.classList.remove('header__link-wrapper_hidden');
    } else {
      SELECTORS.AUTH_BUTTON_MENU.classList.remove('header__button_hidden');
      SELECTORS.AUTH_BUTTON_MENU.classList.add('header__button_visible');
      SELECTORS.LOGOUT_BUTTON_MENU.classList.add('header__button_hidden');
      SELECTORS.LOGOUT_BUTTON_MENU.classList.remove('header__button_visible');
      SELECTORS.SAVEDNEWS_LINK_MENU.classList.add('header__link-wrapper_hidden');
      SELECTORS.SAVEDNEWS_LINK_MENU.classList.remove('header__link-wrapper_visible');
    }
  }
}
