/* eslint-disable no-unused-vars */
import './index.css';
import SELECTORS from './js/constants/selectors';
import Header from './js/components/Header';
import SignInPopup from './js/components/SignInPopup';
import SignUpPopup from './js/components/SignUpPopup';
import SuccessPopup from './js/components/SuccessPopup';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';

const mainApi = new MainApi();
const newsApi = new NewsApi();
const newsCardList = new NewsCardList(SELECTORS.RESULTS_CONTAINER, SELECTORS.NEWSCARDS_CONTAINER,
  SELECTORS.RESULTS_PRELOADING, SELECTORS.RESULTS_NOTFOUND,
  SELECTORS.SHOWMORE_BUTTON, [SELECTORS.RESULTS_ERROR, SELECTORS.RESULTS_TITLE_ERROR],
  mainApi, { newsCard: NewsCard }, 'default');
const menuPopup = new Popup(SELECTORS.MENU_POPUP, [SELECTORS.OPEN_BUTTON_MENU],
  SELECTORS.CLOSE_BUTTON_MENU, true);
const header = new Header(SELECTORS.AUTH_BUTTON, SELECTORS.LOGOUT_BUTTON,
  SELECTORS.LOGOUT_BUTTON_MENU, SELECTORS.SAVEDNEWS_LINK, menuPopup, mainApi);

const JWT_TOKEN = localStorage.getItem('token');
if (JWT_TOKEN) {
  mainApi.loggedIn = true;
  mainApi.getUserData()
    .then((res) => {
      header.render({ isLoggedIn: true, userName: res.data.name });
    })
    .catch((err) => console.error(err));
  mainApi.getArticles()
    .then((res) => {
      newsCardList.savedCards = res.data;
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
const signInForm = new Form(SELECTORS.SIGNIN_FORM, SELECTORS.SIGNIN_SUBMIT_BUTTON,
  mainApi, newsCardList, SELECTORS.SIGNIN_ERRORS, header, signInPopup, successPopup);
const signUpForm = new Form(SELECTORS.SIGNUP_FORM, SELECTORS.SIGNUP_SUBMIT_BUTTON,
  mainApi, newsCardList, SELECTORS.SIGNUP_ERRORS, header, signUpPopup, successPopup);

const search = new Form(SELECTORS.SEARCH_FORM, SELECTORS.SEARCH_BUTTON, newsApi, newsCardList);
