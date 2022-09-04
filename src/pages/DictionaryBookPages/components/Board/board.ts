import dicAndBookVars from '../..';
import getAllWords, {
  getAggregatedWords,
} from '../../../../api/Words/WordsAPI';
import { generalState } from '../../../../states/generalState';
import IWordCard from '../../../../types/interfaces/words';
import renderPagination, {
  handlePaginationListeners,
  handlePaginationState,
} from '../../BookPage/components/Pagination/pagination';
import { dictionaryHeaderState } from '../../DictionaryPage/components/DictionaryHeader/dictionaryHeader';
import { handleCardListeners } from '../WordList/WordCard/wordCard';
import renderWordsList from '../WordList/wordList';

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
                !generalState.currentData.length
                  ? !generalState.userId
                    ? '<h4>Вам нужно авторизоваться</h4>'
                    : '<h4>Вы пока не добавили слова</h4>'
                  : `${renderWordsList(generalState.currentData)}
              ${dicAndBookVars.isBookPage ? renderPagination() : ''}    `
              }
                       
            </div> 
              `;

  main.insertAdjacentHTML('beforeend', html);

  handleListeners();
  handleState();
}

async function handleBookData() {
  if (generalState.userId) {
    const filter = JSON.stringify({
      $and: [
        { page: dicAndBookVars.currentPage - 1 },
        { group: dicAndBookVars.currentGroup },
        {
          $or: [
            { 'userWord.optional.isLearned': true },
            { 'userWord.optional.isLearned': false },
            { 'userWord.optional.isLearned': null },
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

    generalState.currentData = (await getAggregatedWords(
      generalState.userId,
      generalState.token as string,
      dicAndBookVars.bookLimit,
      filter
    )) as IWordCard[];
  } else {
    generalState.currentData = await getAllWords(
      dicAndBookVars.currentGroup,
      dicAndBookVars.currentPage
    );
  }
}

async function handleDictionaryData() {
  if (generalState.userId) {
    let filter: string;
    if (dictionaryHeaderState.typeDictionary === 'learned') {
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

    generalState.currentData = (await getAggregatedWords(
      generalState.userId,
      generalState.token as string,
      dicAndBookVars.dictionaryLimit,
      filter
    )) as IWordCard[];
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
