import dicAndBookVars from '../../..';
import getAllWords, {
  filterState,
  getAggregatedWords,
} from '../../../../../api/Words';
import { handleWordCardListener } from '../../../components/WordList/WordCard/wordCard';
import renderWordsList from '../../../components/WordList/wordList';
import renderPagination, {
  handlePaginationListeners,
  handlePaginationState,
} from '../Pagination/pagination';

async function renderBoardBook() {
  const words = await handleData();

  const board = document.querySelector('.board');

  if (board) {
    board.remove();
  }

  console.log(words);

  const main = document.querySelector('main') as HTMLElement;

  const html = `
            <div class="board">
              ${renderWordsList(words)}
              ${renderPagination()}
            </div> 
              `;

  main.insertAdjacentHTML('beforeend', html);

  handleWordsListListeners();
  handleWordsListState();
}

async function handleData() {
  let words = [];
  const user = JSON.parse(localStorage.getItem('userData') as string);

  if (user) {
    const { userId, token } = user;

    filterState.typeFilter = JSON.stringify({
      $and: [
        { page: dicAndBookVars.currentPage - 1 },
        { group: dicAndBookVars.currentGroup },
        {
          $or: [
            { userWord: null },
            { 'userWord.optional.hard': true },
            { 'userWord.optional.hard': false },
          ],
        },
      ],
    });

    words = await getAggregatedWords(userId, token);
  } else {
    words = await getAllWords(
      dicAndBookVars.currentGroup,
      dicAndBookVars.currentPage
    );
  }

  return words;
}

function handleWordsListListeners() {
  handlePaginationListeners();
  handleWordCardListener();
}

function handleWordsListState() {
  handlePaginationState();
}

export default renderBoardBook;
