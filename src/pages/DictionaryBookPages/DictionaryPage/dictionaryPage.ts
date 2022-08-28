import renderHeader from '../../../components/main-page/components/header/header';
import renderNavigation from '../../../components/main-page/components/navigation/render-navigation';
import renderLevels from '../components/Levels/levels';
import renderBoardDictionary from './components/DictionaryBoard/dictionaryBoard';

function renderDictionaryPage() {
  renderHtml();
  renderLevels();
  renderBoardDictionary();
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

export default renderDictionaryPage;
