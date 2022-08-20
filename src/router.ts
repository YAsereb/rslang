import renderMainPage from './components/main-page/render-main-page';

const getRouter = () => {
  const hash: string = window.location.hash ? window.location.hash.slice(1) : '';
  return hash;
};

const handleRouter = () => {
  const href = getRouter();
  switch (href) {
    case 'electronic-book':
      console.log('electronic-book');
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
};

export const routeInit = () => {
  renderMainPage();
  window.addEventListener('hashchange', handleRouter);
};

export default getRouter;
