import renderDictionaryPage from './components/DictionaryPage';
import renderMainPage from './components/main-page/render-main-page';

function getHash() {
  const hash: string = window.location.hash
    ? window.location.hash.slice(1)
    : '';
  return hash;
}

function handleRouter() {
  const href = getHash();
  switch (href) {
    case 'sign-in':
      console.log('sign-in');
      break;
    case 'electronic-book':
      renderDictionaryPage();
      break;
    case 'list-of-words':
      console.log('list-of-words');
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
