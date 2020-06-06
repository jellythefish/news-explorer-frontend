import './index.css';
import SELECTORS from '../js/constants/selectors';
import Popup from '../js/components/Popup';
import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';

const mainApi = new MainApi();
const menuPopup = new Popup(SELECTORS.MENU_POPUP, [SELECTORS.OPEN_BUTTON_MENU],
  SELECTORS.CLOSE_BUTTON_MENU, true);
const header = new Header(undefined, SELECTORS.LOGOUT_BUTTON,
  SELECTORS.LOGOUT_BUTTON_MENU, SELECTORS.SAVEDNEWS_LINK, menuPopup, mainApi);

mainApi.getUserData()
    .then((res) => {
      header.render({ savedNews: true, userName: res.data.name });
    })
    .catch((err) => console.error(err));
