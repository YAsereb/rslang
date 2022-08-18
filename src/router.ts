import renderMainPage from './components/main-page/render-main-page';

const getRouter = () => {
  const hash: string = window.location.hash ? window.location.hash.slice(1) : '';
  return hash;
};

const handleRouter = () => {
  const url = getRouter();
  switch (url) {
    case 'electronic-book':
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
