import dicAndBookVars from '../..';
import getAllWords, {
  getAggregatedWords,
} from '../../../../api/Words/WordsAPI';
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
              ${!boardState.words.length
      ? '<h4>Вы пока не добавили слова </h4>'
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

    const filter = JSON.stringify({
      $and: [
        { page: dicAndBookVars.currentPage - 1 },
        { group: dicAndBookVars.currentGroup },
        {
          $or: [
            { 'userWord.optional.isDeleted': false },
            { 'userWord.optional.isDeleted': null },
          ],
        },

        {
          $or: [
            { userWord: null },
            { 'userWord.difficulty': 'hard' },
            { 'userWord.difficulty': 'easy' },
          ],
        },
      ],
    });

    boardState.words = await getAggregatedWords(
      userId,
      token,
      dicAndBookVars.bookLimit,
      filter
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
    let filter: string;
    if (dictionaryHeaderState.typeDictionary === 'deleted') {
      filter = JSON.stringify({
        $and: [
          { 'userWord.optional.isLearned': true },
          { group: dicAndBookVars.currentGroup },
        ],
      });
    } else {
      filter = JSON.stringify({
        $and: [
          { 'userWord.difficulty': 'hard' },
          { group: dicAndBookVars.currentGroup },
        ],
      });
    }

    boardState.words = await getAggregatedWords(
      userId,
      token,
      dicAndBookVars.dictionaryLimit,
      filter
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
