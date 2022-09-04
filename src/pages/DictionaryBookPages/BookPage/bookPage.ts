import renderFooter from '../../../components/main-page/components/footer/footer';
import renderHeader, {
  handleHeaderListeners,
} from '../../../components/main-page/components/header/header';
import renderBoard from '../components/Board/board';
import renderLevels from '../components/Levels/levels';

function renderBookPage() {
  renderHtml();
  renderLevels();
  renderBoard();
  handleBookPageListeners();
}

function renderHtml() {
  const { body } = document;

  const html = `
                ${renderHeader()}
                <main class="main"></main>
                ${renderFooter()}
  `;

  body.innerHTML = html;
}

function handleBookPageListeners() {
  handleHeaderListeners();
}

export default renderBookPage;
