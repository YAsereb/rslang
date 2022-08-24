import './style.scss';
import { dictionaryVariables } from '..';
import getAllWords from '../../../api/Words';
import IWordCard from '../../../types/interfaces/words';

import renderPagination, {
  handlePaginationListeners,
  handlePaginationState,
} from './Pagination';
import renderWordCard from './WordCard';

async function renderWordsList() {
  const words: IWordCard[] = await getAllWords(
    dictionaryVariables.currentGroup,
    dictionaryVariables.currentPage
  );

  const board = document.querySelector('.board');

  if (board) {
    board.remove();
  }

  const main = document.querySelector('main') as HTMLElement;

  const html = `
            <div class="board">
              <ul class="words-list">
                  ${words.map((e) => renderWordCard(e)).join('')}
              </ul>
              ${renderPagination()}
            </div> 
              `;

  main.insertAdjacentHTML('beforeend', html);

  handleWordsListListeners();
  handleWordsListState();
}

function handleWordsListListeners() {
  handlePaginationListeners();
}

function handleWordsListState() {
  handlePaginationState();
}

export default renderWordsList;
