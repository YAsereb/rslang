import renderFooter from '../../../components/main-page/components/footer/footer';
import renderHeader, {
  handleHeaderListeners,
} from '../../../components/main-page/components/header/header';
import renderBoard from '../components/Board/board';
import renderLevels from '../components/Levels/levels';
import renderDictionaryHeader from './components/DictionaryHeader/dictionaryHeader';

function renderDictionaryPage() {
  renderHtml();
  renderLevels();
  renderDictionaryHeader();
  renderBoard();

  handleDictionaryPageListeners();
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

function handleDictionaryPageListeners() {
  handleHeaderListeners();
}

export default renderDictionaryPage;
