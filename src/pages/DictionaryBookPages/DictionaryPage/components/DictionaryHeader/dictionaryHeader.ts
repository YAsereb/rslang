import renderBoardDictionary, {
  dictionaryState,
} from '../DictionaryBoard/dictionaryBoard';
import './style.scss';

function renderDictionaryHeader() {
  return `
            <div class="dictionary-header">
                <button class="acitive-btn">Изучаемые</button>
                <button>Сложные</button>
                <button>Удаленные</button>
            </div>

            `;
}

export function handleDictionaryHeaderListeners() {
  const filterMenu = document.querySelector('.dictionary-header');

  filterMenu?.addEventListener('click', handleFilterDictionaryWords);
}

function handleFilterDictionaryWords(event: Event) {
  const target = event.target as HTMLElement;

  if (target.textContent === 'Удаленные') {
    dictionaryState.typeDictionary = 'deleted';
    renderBoardDictionary();
  } else if (target.textContent === 'Изучаемые') {
    dictionaryState.typeDictionary = 'hard';
    renderBoardDictionary();
  } else if (target.textContent === 'Сложные') {
    dictionaryState.typeDictionary = 'hard';
    renderBoardDictionary();
  }
}

export default renderDictionaryHeader;
