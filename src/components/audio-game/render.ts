import { Word } from '../../types';
import { getWords } from './api';
import { getWordsArray } from './game';
import { state } from './state';
import './style.scss';

export function renderWord(word: Word) {
  return `
  <div class="word" id="${word.id}">${word.word}</div>
  `;
}

export async function renderWords(page = 0, group = 0) {
  const mainHtml = document.querySelector('main') as HTMLElement;
  const words = await getWords(page, group);
  const wordsArray = getWordsArray(words);

  const html = `
  <div class="audio-wrapper">
    <audio src="../../assets/${state.trueWordAudioExample}" class="audio" controls preload="auto"></audio>
    <img>
  </div>
    <div class="wrapper-words">
      ${wordsArray.map((word) => renderWord(word)).join('')}
    </div>
  `;
  mainHtml.innerHTML = html;
}
