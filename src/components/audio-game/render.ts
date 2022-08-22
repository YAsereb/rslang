import { Word } from '../../types';
import { getWords } from './api';
import { getWordsArray } from './game';

export function renderWord(word: Word) {
  return `
  <div class="word">${word.word}</div>
  `;
}

export async function renderWords(page = 0, group = 0) {
  const mainHtml = document.querySelector('main') as HTMLElement;
  const words = await getWords(page, group);
  const wordsArray = getWordsArray(words);

  const html = `
    <div class="wrapper">
      ${wordsArray.map((word) => renderWord(word)).join('')}
    </div>
  `;
  mainHtml.innerHTML = html;
}
