import { AnswerWord, Word } from '../../types';
import { getWords } from './api';
import { getWordsArray, playAudio } from './game';
import { listenerAnswer, listenerChooseGroup, listenerStatistic } from './listener';
import { state } from './state';
import './style.scss';

export function renderStartGame() {
  const mainHtml = document.querySelector('main') as HTMLElement;
  const html = `
    <div class="start-game flex-center flex-column">
      <h3 class="audio-header">Игра аудиовызов</h3>
      <p class="text">Эта игра развивает понимание слов на слух</p> 
      <p class="text">Вам будет предложено 20 попыток, в которых нужно выбрать слово, звучащее в аудиодорожке</p>
      <p class="text">Выберите уровень сложности от 1 до 6</p>
      <div class="group-wrapper" id="group">
        <div class="group-level flex-center">1</div>
        <div class="group-level flex-center">2</div>
        <div class="group-level flex-center">3</div>
        <div class="group-level flex-center">4</div>
        <div class="group-level flex-center">5</div>
        <div class="group-level flex-center">6</div>
      </div> 
    </div> 
  `;
  mainHtml.innerHTML = html;
  listenerChooseGroup();
}

export function renderWord(word: Word) {
  return `
  <div class="word flex-center" id="${word.id}">${word.word}</div>
  `;
}

export async function renderWords(page: number, group: number) {
  const mainHtml = document.querySelector('main') as HTMLElement;
  mainHtml.classList.add('center-page');
  mainHtml.classList.add('flex-center');

  const words = await getWords(page, group);
  const wordsArray = getWordsArray(words);
  state.isButtonActive = false;

  const html = `
  <div class="counter">${state.countAnswer}/20</div>
  <div class="audio-wrapper flex-center flex-column">
    <img src="../../assets/img/Sound-Audio.png" class="audio-img">
    <audio src="../../assets/${state.trueWordAudioExample}" class="audio">
    </audio>
    <p id="true-word" class="true-word"></p>
      <div class="wrapper-words">
        ${wordsArray.map((word) => renderWord(word)).join('')}
      </div>
    </div>
  `;
  mainHtml.innerHTML = html;
  setTimeout(playAudio, 800);
  listenerAnswer();
}

function renderAnswer(word: AnswerWord) {
  return `
    <div class="word-card">
      <div class="answers-item flex-start">
        <img src="../../assets/icon/sound-icon.png"class="sound-icon" id="play">
        <audio src="../../assets/${word.trueWordAudio}" muted></audio>
        <p>${word.trueWord} &mdash; ${word.wordTranslate}</p>
      </div>
    </div>
  `;
}

export function endGame() {
  const mainHtml = document.querySelector('main') as HTMLElement;

  const html = `
  <div class="answer-wrapper flex-center flex-column">
    <div class="answers flex-column">
      <p class="">Не знаю <span class="unknown-words">${state.falseAnswers.length}</span></p>
        ${state.falseAnswers.map((word) => renderAnswer(word)).join('')}
    </div>
    <div class="answers flex-column">
      <p class="">Знаю <span class="known-words">${state.trueAnswers.length}</span></p>
        ${state.trueAnswers.map((word) => renderAnswer(word)).join('')}
    </div>
  </div>

  `;
  mainHtml.innerHTML = html;
  listenerStatistic();
}
