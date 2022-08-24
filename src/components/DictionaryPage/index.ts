import renderLevels from './Levels';
import renderWordsList from './WordsList';

export const dictionaryVariables = {
  currentGroup: '0',
  currentPage: 1,
  prevPage: 1,
};

function renderDictionaryPage() {
  console.log(2);

  renderMainDictionary();
}

function renderMainDictionary() {
  renderHtmlDictinaryPage();
  renderLevels();
  renderWordsList();
}

function renderHtmlDictinaryPage() {
  const { body } = document;

  const main = document.createElement('main');

  body.append(main);
}

export default renderDictionaryPage;
