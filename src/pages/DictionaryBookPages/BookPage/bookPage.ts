import renderHeader from '../../../components/main-page/components/header/header';
import renderNavigation from '../../../components/main-page/components/navigation/render-navigation';
import renderBoard from '../components/Board/board';
import renderLevels from '../components/Levels/levels';

function renderBookPage() {
  renderHtml();
  renderLevels();
  renderBoard();
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
