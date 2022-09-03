import renderBoard from '../../../components/Board/board';
import './style.scss';

export const dictionaryHeaderState = {
  typeDictionary: 'hard',
};

function renderDictionaryHeader() {
  const main = document.querySelector('main') as HTMLElement;

  const html = `
                <div class="dictionary-header">
                  <button data-type="studied">Изучаемые</button>
                  <button data-type="hard">Сложные</button>
                  <button data-type="deleted">Изученные</button>
                </div>
              `;

  main.insertAdjacentHTML('beforeend', html);

  handleDictionaryHeaderListeners();
  handleDictionaryHeaderState();
}

export function handleDictionaryHeaderListeners() {
  const filterMenu = document.querySelector('.dictionary-header');

  filterMenu?.addEventListener('click', handleFilterDictionaryWords);
}

function handleDictionaryHeaderState() {
  const activeBtn = document.querySelector(
    `[data-type="${dictionaryHeaderState.typeDictionary}"]`
  );

  activeBtn?.classList.add('active-btn');
}

function handleFilterDictionaryWords(event: Event) {
  const target = event.target as HTMLElement;
  const headerBtns = document.querySelectorAll('.dictionary-header button');

  if (target.textContent === 'Изученные') {
    dictionaryHeaderState.typeDictionary = 'deleted';
  } else if (target.textContent === 'Изучаемые') {
    dictionaryHeaderState.typeDictionary = 'studied';
  } else if (target.textContent === 'Сложные') {
    dictionaryHeaderState.typeDictionary = 'hard';
  } else {
    return;
  }

  headerBtns.forEach((btn) => btn.classList.remove('active-btn'));
  target.classList.add('active-btn');
  renderBoard();
}

export default renderDictionaryHeader;
