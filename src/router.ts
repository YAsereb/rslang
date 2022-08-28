import renderAuthentication from './components/Authentication';
import renderMainPage from './components/main-page/render-main-page';
import renderBookPage from './pages/DictionaryBookPages/BookPage/bookPage';
import renderDictionaryPage from './pages/DictionaryBookPages/DictionaryPage/dictionaryPage';

function getHash() {
  const hash: string = window.location.hash
    ? window.location.hash.slice(1)
    : '';
  return hash;
}

function handleRouter() {
  const href = getHash();
  const { body } = document;

  body.innerHTML = '';

  switch (href) {
    case 'auth':
      renderAuthentication();
      break;
    case 'book':
      renderBookPage();
      break;
    case 'dictionary':
      renderDictionaryPage();
      break;
    case 'audio-game':
      console.log('audio-game');
      break;
    case 'sprint-game':
      console.log('list-of-words');
      break;
    case 'progress':
      console.log('progress');
      break;
    case 'studied-words':
      console.log('studied-words');
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
