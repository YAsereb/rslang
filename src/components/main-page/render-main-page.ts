import renderFooter from './components/footer/footer';
import renderHeader, {
  handleHeaderListeners,
} from './components/header/header';
import renderMain from './components/main/render-main';

function renderMainPage() {
  const { body } = document;

  const html = `
   ${renderHeader()}
   ${renderMain()}
   ${renderFooter()}
  `;

  body.innerHTML = html;

  handleMainPageListeners();
}

function handleMainPageListeners() {
  handleHeaderListeners();
}

export default renderMainPage;
