import { filterState, getAggregatedWords } from '../../../../../api/Words';
import renderWordsList from '../../../components/WordList/wordList';
import renderDictionaryHeader, {
  handleDictionaryHeaderListeners,
} from '../DictionaryHeader/dictionaryHeader';

export const dictionaryState = {
  typeDictionary: 'hard',
};

async function renderBoardDictionary() {
  const words = await handleData();

  console.log(words);

  const board = document.querySelector('.board');

  if (board) {
    board.remove();
  }

  const main = document.querySelector('main') as HTMLElement;

  const html = `
            <div class="board">
              ${renderDictionaryHeader()}
              ${renderWordsList(words)}
            </div> 
              `;

  main.insertAdjacentHTML('beforeend', html);

  handleDictionaryListeners();
}

async function handleData() {
  let words = [];
  const user = JSON.parse(localStorage.getItem('userData') as string);

  const { userId, token } = user;

  if (dictionaryState.typeDictionary === 'deleted') {
    console.log(1);

    filterState.typeFilter = JSON.stringify({
      $and: [{ 'userWord.optional.isDeleted': true }],
    });
  } else {
    filterState.typeFilter = JSON.stringify({
      $and: [{ 'userWord.optional.hard': true }],
    });
  }

  words = await getAggregatedWords(userId, token);

  return words;
}

function handleDictionaryListeners() {
  handleDictionaryHeaderListeners();
}

export default renderBoardDictionary;
