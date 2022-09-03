import audioGameStart from './components/audio-game';
import renderAuthPage from './components/Authentication';
import renderMainPage from './components/main-page/render-main-page';
import dicAndBookVars from './pages/DictionaryBookPages';
import renderBookPage from './pages/DictionaryBookPages/BookPage/bookPage';
import renderDictionaryPage from './pages/DictionaryBookPages/DictionaryPage/dictionaryPage';
import renderSprintGamePage from './pages/SprintGamePage/sprintGamePage';
import { generalState } from './states/generalState';

function getHash() {
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
      audioGameStart();
      break;
    case 'sprint':
      renderSprintGamePage();
      break;
    case 'statistics':
      console.log('statistics');
      break;
    default:
      renderMainPage();
      break;
  }
}

function routeInit() {
  handleRouter();
  window.addEventListener('hashchange', handleRouter);
}

export default routeInit;
