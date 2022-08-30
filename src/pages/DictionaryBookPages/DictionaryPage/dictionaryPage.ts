import renderHeader, {
  handleHeaderListeners,
} from '../../../components/main-page/components/header/header';
import renderBoard from '../components/Board/board';
import renderLevels from '../components/Levels/levels';

function renderDictionaryPage() {
  renderHtml();
  renderLevels();
  renderBoard();

  handleDictionaryPageListeners();
}

function renderHtml() {
  const { body } = document;

  const html = `
                ${renderHeader()}
                <main></main>
  `;

  body.innerHTML = html;
}

function handleDictionaryPageListeners() {
  handleHeaderListeners();
}

export default renderDictionaryPage;
