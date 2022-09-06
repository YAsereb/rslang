import renderAuthPage from './components/Authentication';
import renderMainPage from './components/main-page/render-main-page';
import renderStatistic from './components/statistic/render';
import renderAudioGamePage from './pages/AudioGamePage/audioGamePage';
import dicAndBookVars from './pages/DictionaryBookPages';
import renderBookPage from './pages/DictionaryBookPages/BookPage/bookPage';
import renderDictionaryPage from './pages/DictionaryBookPages/DictionaryPage/dictionaryPage';
import renderSprintGamePage from './pages/SprintGamePage/sprintGamePage';
import { generalState } from './states/generalState';

export function getHash() {
  const hash: string = window.location.hash
    ? window.location.hash.slice(1)
    : '';
  return hash;
}

function handleGeneralStateURL(url: string) {
  generalState.previousURL = generalState.currentURL;
  generalState.currentURL = url;
}

export function handleRouter() {
  const href = getHash();

  const { body } = document;

  body.innerHTML = '';
  handleGeneralStateURL(href);

  switch (href) {
    case 'auth':
      renderAuthPage();
      break;
    case 'book':
      dicAndBookVars.isBookPage = true;
      renderBookPage();
      break;
    case 'dictionary':
      dicAndBookVars.isBookPage = false;
      renderDictionaryPage();
      break;
    case 'audiocall':
      renderAudioGamePage();
      break;
    case 'sprint':
      renderSprintGamePage();
      break;
    case 'statistics':
      generalState.currentData = [];
      renderStatistic();
      break;
    default:
      generalState.currentData = [];
      renderMainPage();
      break;
  }
}

function routeInit() {
  handleRouter();
  window.addEventListener('hashchange', handleRouter);
}

export default routeInit;
