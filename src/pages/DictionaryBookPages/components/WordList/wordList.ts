import './style.scss';
import IWordCard from '../../../../types/interfaces/words';
import renderWordCard from './WordCard/wordCard';

function renderWordsList(words: IWordCard[]) {
  return `
         <ul class="words-list">
            ${words.map((word) => renderWordCard(word)).join('')}
        </ul>
    `;
}

export default renderWordsList;
