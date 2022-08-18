import renderFooter from './footer';
import renderHeader from './header';
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
