import IWordCard from '../../../../types/interfaces/words';

function renderResultWord(word: IWordCard) {
  return `  <li>
                <button>зв</button>
                <span>${word.word}</span>
                <span>-${word.wordTranslate}</span>
            </li>
            `;
}

export default renderResultWord;
