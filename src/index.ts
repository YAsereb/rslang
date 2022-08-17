import renderAuthentication from './components/Authentication';
import { renderFooter, renderMain } from './components/main-page/render';

function start() {
  renderMain();
  renderFooter();
  renderAuthentication();
}

start();
