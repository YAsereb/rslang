import { Word } from '../../types';
import { getWords } from './api';
import { getWordsArray } from './game';
import { listenerAnswer, listenerChooseGroup } from './listener';
import { state } from './state';
import './style.scss';

export function renderStartGame() {
  const mainHtml = document.querySelector('main') as HTMLElement;
  const html = `
    <div class="start-game">
      <h3 class="audio-header">Игра аудиовызов</h3>
      <p class="text">Эта игра развивает понимание слов на слух</p> 
      <p class="text">Вам будет предложено 20 попыток, в которых нужно выбрать слово, звучащее в аудиодорожке</p>
      <p class="text">Выберите уровень сложности от 1 до 6</p>
      <div class="group-wrapper" id="group">
        <div class="group-level">1</div>
        <div class="group-level">2</div>
        <div class="group-level">3</div>
        <div class="group-level">4</div>
        <div class="group-level">5</div>
        <div class="group-level">6</div>
      </div> 
    </div> 
  `;
  mainHtml.innerHTML = html;
  listenerChooseGroup();
}

export function renderWord(word: Word) {
  return `
  <div class="word" id="${word.id}">${word.word}</div>
  `;
}

export async function renderWords(page: number, group: number) {
  const mainHtml = document.querySelector('main') as HTMLElement;
  const words = await getWords(page, group);
  const wordsArray = getWordsArray(words);

  const html = `
  <div class="counter">${state.countAnswer}</div>
  <div class="audio-wrapper">
    <img src="../../assets/img/Sound-Audio.png" class="audio-img">
    <audio src="../../assets/${state.trueWordAudioExample}" class="audio"></audio>
      <div class="wrapper-words">
        ${wordsArray.map((word) => renderWord(word)).join('')}
      </div>
    </div>
  `;
  mainHtml.innerHTML = html;
  listenerAnswer();
}
