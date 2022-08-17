import renderAuthentication from './components/Authentication';
import { renderFooter, renderMain } from './components/main-page/render';
import './style.css';

function start() {
  renderMain();
  renderFooter();
  renderAuthentication();
}

start();
