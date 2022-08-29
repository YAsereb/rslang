import renderFooter from './components/footer/footer';
import renderHeader from './components/header/header';
import renderNavigation from './components/navigation/render-navigation';
import renderMain from './components/main/render-main';

function renderMainPage() {
  const { body } = document;

  const html = `
   ${renderHeader()}
   ${renderNavigation()}
   ${renderMain()}
   ${renderFooter()}
  `;

  body.innerHTML = html;
}

export default renderMainPage;
