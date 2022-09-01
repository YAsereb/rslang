import dicAndBookVars from '../..';
import getAllWords, {
  filterState,
  getAggregatedWords,
} from '../../../../api/Words';
import renderPagination, {
  handlePaginationListeners,
  handlePaginationState,
} from '../../BookPage/components/Pagination/pagination';
import { dictionaryHeaderState } from '../../DictionaryPage/components/DictionaryHeader/dictionaryHeader';
import { handleCardListeners } from '../WordList/WordCard/wordCard';
import renderWordsList from '../WordList/wordList';

const boardState = {
  words: [],
};

export async function renderBoard() {
  if (dicAndBookVars.isBookPage) {
    await handleBookData();
  } else {
    await handleDictionaryData();
  }

  const board = document.querySelector('.board');

  if (board) {
    board.remove();
  }

  const main = document.querySelector('main') as HTMLElement;

  const html = `
            <div class="board">
              ${
                !boardState.words.length
                  ? '<h4>Нету слов</h4>'
                  : `${renderWordsList(boardState.words)}
              ${dicAndBookVars.isBookPage ? renderPagination() : ''}    `
              }
                       
            </div> 
              `;

  main.insertAdjacentHTML('beforeend', html);

  handleListeners();
  handleState();
}

async function handleBookData() {
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

    boardState.words = await getAggregatedWords(
      userId,
      token,
      dicAndBookVars.bookLimit
    );
  } else {
    boardState.words = await getAllWords(
      dicAndBookVars.currentGroup,
      dicAndBookVars.currentPage
    );
  }
}

async function handleDictionaryData() {
  const user = JSON.parse(localStorage.getItem('userData') as string);

  if (user) {
    const { userId, token } = user;

    if (dictionaryHeaderState.typeDictionary === 'deleted') {
      filterState.typeFilter = JSON.stringify({
        $and: [
          { 'userWord.optional.isDeleted': true },
          { group: dicAndBookVars.currentGroup },
        ],
      });
    } else {
      filterState.typeFilter = JSON.stringify({
        $and: [
          { 'userWord.optional.hard': true },
          { group: dicAndBookVars.currentGroup },
        ],
      });
    }

    boardState.words = await getAggregatedWords(
      userId,
      token,
      dicAndBookVars.dictionaryLimit
    );
  }
}

function handleListeners() {
  handlePaginationListeners();
  handleCardListeners();
}

function handleState() {
  handlePaginationState();
}

export default renderBoard;
