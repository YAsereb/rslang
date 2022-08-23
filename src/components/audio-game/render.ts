import { Word } from '../../types';
import { getWords } from './api';
import { getWordsArray } from './game';
import listener from './listener';
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
  <div class="counter">${state.countAnswer}</div>
  <div class="audio-wrapper">
    <img src="../../assets/img/Sound-Audio.png" class="audio-img">
    <audio src="../../assets/${state.trueWordAudioExample}" autoplay class="audio"></audio>
      <div class="wrapper-words">
        ${wordsArray.map((word) => renderWord(word)).join('')}
      </div>
    </div>
  `;
  mainHtml.innerHTML = html;
  listener();
}
