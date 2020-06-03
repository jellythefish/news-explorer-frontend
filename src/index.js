import './index.css';
import SELECTORS from './js/constants/selectors';
import Header from './js/components/Header';
import SignInPopup from './js/components/SignInPopup';
import SignUpPopup from './js/components/SignUpPopup';
import SuccessPopup from './js/components/SuccessPopup';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';

const mainApi = new MainApi();
const menuPopup = new Popup(SELECTORS.MENU_POPUP, [SELECTORS.OPEN_BUTTON_MENU],
  SELECTORS.CLOSE_BUTTON_MENU, true);
const header = new Header(SELECTORS.AUTH_BUTTON, SELECTORS.LOGOUT_BUTTON,
  SELECTORS.SAVEDNEWS_LINK, menuPopup);

const JWT_TOKEN = window.localStorage.getItem('jwt');
if (JWT_TOKEN) {
  mainApi.getUserData()
    .then((res) => {
      header.render({ isLoggedIn: true, userName: res.name });
    })
    .catch((err) => console.error(err));
}

const signInPopup = new SignInPopup(SELECTORS.SIGNIN_POPUP,
  [SELECTORS.AUTH_BUTTON_MENU, SELECTORS.AUTH_BUTTON],
  SELECTORS.CLOSE_SIGNIN, SELECTORS.SIGNIN_POPUP_LINK);
const signUpPopup = new SignUpPopup(SELECTORS.SIGNUP_POPUP, undefined, SELECTORS.CLOSE_SIGNUP,
  SELECTORS.SIGNUP_POPUP_LINK);
const successPopup = new SuccessPopup(SELECTORS.SUCCESS_POPUP, undefined, SELECTORS.CLOSE_SUCCESS,
  SELECTORS.SUCCESS_POPUP_LINK);
signInPopup.linkSignUpPopup(signUpPopup);
signUpPopup.linkSignInPopup(signInPopup);
successPopup.linkSignInPopup(signInPopup);

const signInForm = new Form(SELECTORS.SIGNIN_FORM, SELECTORS.SIGNIN_ERRORS,
  SELECTORS.SIGNIN_SUBMIT_BUTTON, mainApi, header, signInPopup, successPopup);
const signUpForm = new Form(SELECTORS.SIGNUP_FORM, SELECTORS.SIGNUP_ERRORS,
  SELECTORS.SIGNUP_SUBMIT_BUTTON, mainApi, header, signUpPopup, successPopup);

