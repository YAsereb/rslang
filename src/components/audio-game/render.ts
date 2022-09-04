import { AnswerWord, Word } from '../../types';
import renderHeader, { handleHeaderListeners } from '../main-page/components/header/header';
import { getWordsArray, playAudio } from './game';
import { listenerAnswer, listenerChooseGroup, listenerStatistic } from './listener';
import { audioGameState } from '../../states/audioGameState';
import './style.scss';
import { getWords } from './api';

export function renderStartGame() {
  const { body } = document;

  const html = `

  ${renderHeader()}
  <main class="main flex-center">
    <div class="start-screen-img">
      <div class="game-wrapper">
        <div class="start-screen-window">
            <div class="flex-center flex-column">
              <div class="game-description">
                <h3 class="audio-header">Игра аудиовызов</h3>
                <p class="text">Эта игра развивает понимание слов на слух</p>
                <p class="text">Вам будет предложено 20 попыток, в которых нужно выбрать слово, звучащее в аудиодорожке</p>
                <p class="text">Выберите уровень сложности от 1 до 6:</p>
              </div>
              <div class="group-wrapper" id="group">
                <div class="group-level flex-center">1</div>
                <div class="group-level flex-center">2</div>
                <div class="group-level flex-center">3</div>
                <div class="group-level flex-center">4</div>
                <div class="group-level flex-center">5</div>
                <div class="group-level flex-center">6</div>
              </div>
            </div>
            </div>
          </div>
        </div>
  </main>
    `;
  body.innerHTML = html;
  listenerChooseGroup();
  handleHeaderListeners();
}

export function renderWord(word: Word) {
  return `
  <div class="word flex-center" id="${word.id}">${word.word}</div>
  `;
}

export async function renderWords(group: number, page: number) {
  const { body } = document;

  const words = await getWords(group, page);
  const wordsArray = getWordsArray(words);
  audioGameState.isButtonActive = false;

  const html = `
  ${renderHeader()}
  <main class="main flex-center">
    <div class="start-screen-img">
      <div class="game-wrapper">
        <div class="counter">${audioGameState.countAnswer}/20</div>
        <div class="audio-wrapper flex-center flex-column">
          <img src="../../assets/img/Sound-Audio.png" class="audio-img">
          <audio src="../../${audioGameState.trueWordAudio}" class="audio">
          </audio>
          <p id="true-word" class="true-word"></p>
            <div class="wrapper-words">
              ${wordsArray.map((word) => renderWord(word)).join('')}
            </div>
      </div>
    </div>
  </main>
  `;
  body.innerHTML = html;
  setTimeout(playAudio, 800);
  listenerAnswer();
  handleHeaderListeners();
}

function renderAnswer(word: AnswerWord) {
  return `
    <div class="word-card">
      <div class="answers-item flex-start">
        <img src="../../assets/icon/sound-icon.png"class="sound-icon" id="play">
        <audio src="../../${word.trueWordAudio}" muted></audio>
        <p>${word.trueWord} &mdash; ${word.wordTranslate}</p>
      </div>
    </div>
  `;
}

export function endGame() {
  const { body } = document;

  const html = `
  ${renderHeader()}
  <main class="main flex-center">
    <div class="start-screen-img">
    <div class="game-wrapper">
      <div class="answer-wrapper flex-center flex-column">
        <div class="answers flex-column">
          <p class="knowledge">Не знаю <span class="unknown-words">${audioGameState.falseAnswers.length}</span></p>
            ${audioGameState.falseAnswers.map((word) => renderAnswer(word)).join('')}
        </div>
        <div class="answers flex-column">
          <p class="knowledge">Знаю <span class="known-words">${audioGameState.trueAnswers.length}</span></p>
            ${audioGameState.trueAnswers.map((word) => renderAnswer(word)).join('')}
        </div>
      </div>
    </div>
    </div>
  </main>
  `;
  body.innerHTML = html;
  listenerStatistic();
}
