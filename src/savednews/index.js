import './index.css';

import SELECTORS from '../js/constants/selectors';
import Popup from '../js/components/Popup';

const menuPopup = new Popup(SELECTORS.MENU_POPUP, [SELECTORS.OPEN_BUTTON_MENU], SELECTORS.CLOSE_BUTTON_MENU, true);
