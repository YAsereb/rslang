import renderFooter from './compomemts/footer/footer';
import renderHeader from './compomemts/header/header';
import renderMain from './render-main';

function renderMainPage() {
  const { body } = document;
  const html = `
   ${renderHeader()}
   ${renderMain()}
   ${renderFooter()}
  `;
  body.innerHTML = html;
}

export default renderMainPage;
