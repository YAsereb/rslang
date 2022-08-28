import renderHeader from '../../../components/main-page/components/header/header';
import renderNavigation from '../../../components/main-page/components/navigation/render-navigation';
import renderLevels from '../components/Levels/levels';
import renderBoardBook from './components/BookBoard/bookBoard';

function renderBookPage() {
  renderHtml();
  renderLevels();
  renderBoardBook();
}

function renderHtml() {
  const { body } = document;

  const html = `
                ${renderHeader()}
                ${renderNavigation()}
                <main></main>
  `;

  body.innerHTML = html;
}

export default renderBookPage;
