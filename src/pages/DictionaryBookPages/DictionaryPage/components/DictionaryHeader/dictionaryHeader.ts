import renderBoard from '../../../components/Board/board';
import './style.scss';

export const dictionaryHeaderState = {
  typeDictionary: 'hard',
};

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
    dictionaryHeaderState.typeDictionary = 'deleted';
    renderBoard();
  } else if (target.textContent === 'Изучаемые') {
    dictionaryHeaderState.typeDictionary = 'hard';
    renderBoard();
  } else if (target.textContent === 'Сложные') {
    dictionaryHeaderState.typeDictionary = 'hard';
    renderBoard();
  }
}

export default renderDictionaryHeader;
