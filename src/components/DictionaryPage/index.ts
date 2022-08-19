import './style.scss';
import getAllWords from '../../api/Words';
import IWordCard from '../../types/interfaces/words';
import renderWordCard from './WordCard';

function renderDictionaryPage() {
  renderMainDictionary();
}

async function renderMainDictionary() {
  const { body } = document;

  const words: IWordCard[] = await getAllWords();

  const main = document.createElement('main');

  main.innerHTML = `
                    <ul class="words-list">
                        ${words.map((e) => renderWordCard(e)).join('')}
                    </ul>
  
  
                    `;

  body.append(main);
}

export default renderDictionaryPage;
