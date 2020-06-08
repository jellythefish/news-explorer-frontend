import './index.css';
import SELECTORS from '../js/constants/selectors';
import Popup from '../js/components/Popup';
import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';
import NewsCardList from '../js/components/NewsCardList';
import NewsCard from '../js/components/NewsCard';

const mainApi = new MainApi(); mainApi.loggedIn = true;
const menuPopup = new Popup(SELECTORS.MENU_POPUP, [SELECTORS.OPEN_BUTTON_MENU],
  SELECTORS.CLOSE_BUTTON_MENU, true);
const header = new Header(undefined, SELECTORS.LOGOUT_BUTTON,
  SELECTORS.LOGOUT_BUTTON_MENU, SELECTORS.SAVEDNEWS_LINK, menuPopup, mainApi);
  const newsCardList = new NewsCardList(SELECTORS.SAVEDNEWS_CONTAINER, SELECTORS.NEWSCARDS_CONTAINER,
    undefined, undefined, undefined, undefined, mainApi, { newsCard: NewsCard }, 'saved-news');

let name;

mainApi.getUserData()
  .then((res) => {
    name = res.data.name;
    header.render({ savedNews: true, userName: name });
  })
  .then((res) => {
    return mainApi.getArticles();
  })
  .then((res) => {
    newsCardList.savedCards = res.data;
    const articleTotal = res.data.length;
    const sortedKeywords = sortKeywords(newsCardList.countKeywords());
    renderStats(name, articleTotal, sortedKeywords);
    newsCardList.addCards(newsCardList.savedCards);
    newsCardList.renderSavedNews();
  })
  .catch((err) => console.error(err));

function renderStats(username, articleCnt, sortedKeywords) {
  let keywords;
  if (0 < sortedKeywords.length && sortedKeywords.length <= 3) {
    keywords = sortedKeywords.slice(0, 3);
  } else if (sortedKeywords.length > 3) {
    keywords = [sortedKeywords[0], sortedKeywords[1], sortedKeywords.length - 2];
  }
  SELECTORS.ARTICLES_COUNTER.textContent = `${username}, у вас ${articleCnt} сохраненных статей`;
  if (!keywords) return SELECTORS.ARTICLES_KEYWORDS.textContent = '';
  if (keywords.length === 1) {
    SELECTORS.ARTICLES_KEYWORD_1.textContent = `${keywords[0][0]}.`;
    SELECTORS.ARTICLES_KEYWORD_2.textContent = '';
    SELECTORS.ARTICLES_KEYWORD_OTHERS.textContent = '';
  } else if (keywords.length === 2) {
    SELECTORS.ARTICLES_KEYWORD_1.textContent = keywords[0][0];
    SELECTORS.ARTICLES_KEYWORD_2.textContent = ` и ${keywords[1][0]}.`;
    SELECTORS.ARTICLES_KEYWORD_OTHERS.textContent = '';
  } else if (keywords.length === 3 && keywords[2].length > 1) {
    SELECTORS.ARTICLES_KEYWORD_1.textContent = keywords[0][0];
    SELECTORS.ARTICLES_KEYWORD_2.textContent = `, ${keywords[1][0]}`;
    SELECTORS.ARTICLES_KEYWORD_OTHERS.textContent = ` и ${keywords[2][0]}.`;
  } else {
    SELECTORS.ARTICLES_KEYWORD_1.textContent = keywords[0][0];
    SELECTORS.ARTICLES_KEYWORD_2.textContent = `, ${keywords[1][0]}`;
    SELECTORS.ARTICLES_KEYWORD_OTHERS.textContent = ` и ${keywords[2]} другим.`;
  }
}

function sortKeywords(keywords) {
  const res = [];
  for (let elem in keywords) {
    res.push([elem, keywords[elem]]);
  }
  res.sort(function(a, b) {
    return b[1] - a[1];
  })
  return res;
}
