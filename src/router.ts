import audioGameStart from './components/audio-game';
import renderAuthentication from './components/Authentication';
import renderMainPage from './components/main-page/render-main-page';
import dicAndBookVars from './pages/DictionaryBookPages';
import renderBookPage from './pages/DictionaryBookPages/BookPage/bookPage';
import renderDictionaryPage from './pages/DictionaryBookPages/DictionaryPage/dictionaryPage';
import { generalState } from './types/everydayTypes/generalState';

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

function handleRouter() {
  const href = getHash();

  const { body } = document;

  body.innerHTML = '';
  handleGeneralStateURL(href);

  switch (href) {
    case 'auth':
      renderAuthentication();
      break;
    case 'book':
      dicAndBookVars.isBookPage = true;
      renderBookPage();
      break;
    case 'dictionary':
      dicAndBookVars.isBookPage = false;
      renderDictionaryPage();
      break;
    case 'audio-game':
      audioGameStart();
      break;
    case 'sprint-game':
      console.log('sprint-game');

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
