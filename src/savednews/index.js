import './index.css';
import SELECTORS from '../js/constants/selectors';
import Popup from '../js/components/Popup';
import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';
import NewsCardList from '../js/components/NewsCardList';
import NewsCard from '../js/components/NewsCard';
import Stats from '../js/components/Stats';

const mainApi = new MainApi(); mainApi.loggedIn = true;
const menuPopup = new Popup(SELECTORS.MENU_POPUP, [SELECTORS.OPEN_BUTTON_MENU],
  SELECTORS.CLOSE_BUTTON_MENU, true);
const header = new Header(undefined, SELECTORS.LOGOUT_BUTTON,
  SELECTORS.LOGOUT_BUTTON_MENU, SELECTORS.SAVEDNEWS_LINK, menuPopup, mainApi);
const stats = new Stats(SELECTORS.ARTICLES_COUNTER, SELECTORS.ARTICLES_KEYWORDS, SELECTORS.ARTICLES_KEYWORD_1,
  SELECTORS.ARTICLES_KEYWORD_2, SELECTORS.ARTICLES_KEYWORD_OTHERS);
const newsCardList = new NewsCardList(SELECTORS.SAVEDNEWS_CONTAINER, SELECTORS.NEWSCARDS_CONTAINER,
  undefined, undefined, undefined, undefined, mainApi, { newsCard: NewsCard }, 'saved-news', stats);

mainApi.getUserData()
  .then((res) => {
    stats.username = res.data.name;
    header.render({ savedNews: true, userName: res.data.name });
  })
  .then((res) => {
    return mainApi.getArticles();
  })
  .then((res) => {
    newsCardList.savedCards = res.data;
    const articleTotal = res.data.length;
    const sortedKeywords = stats.sortKeywords(newsCardList.countKeywords());
    stats.renderStats(articleTotal, sortedKeywords);
    newsCardList.addCards(newsCardList.savedCards);
    newsCardList.renderSavedNews();
  })
  .catch((err) => console.error(err));
