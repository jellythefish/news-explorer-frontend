import './index.css';
import CONSTANTS from './js/constants/constants';
import Header from './js/components/Header';
import Popup from './js/components/Popup';
import SignInPopup from './js/components/SignInPopup';
import SignUpPopup from './js/components/SignUpPopup';
import SuccessPopup from './js/components/SuccessPopup';

const signInPopup = new SignInPopup(CONSTANTS.SIGNIN_POPUP, CONSTANTS.AUTH_BUTTON,
  CONSTANTS.CLOSE_SIGNIN, CONSTANTS.SIGNIN_POPUP_LINK);
const signUpPopup = new SignUpPopup(CONSTANTS.SIGNUP_POPUP, undefined, CONSTANTS.CLOSE_SIGNUP,
  CONSTANTS.SIGNUP_POPUP_LINK);
const successPopup = new SuccessPopup(CONSTANTS.SUCCESS_POPUP, undefined, CONSTANTS.CLOSE_SUCCESS,
  CONSTANTS.SUCCESS_POPUP_LINK);
signInPopup.linkSignUpPopup(signUpPopup);
signUpPopup.linkSignInPopup(signInPopup);
successPopup.linkSignInPopup(signInPopup);

// const header = new Header();