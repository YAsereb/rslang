import '../../../SprintGamePage/components/StartScreenSprint/style.scss';
import getAllWords from '../../../../api/Words/WordsAPI';
import { generalState } from '../../../../states/generalState';
import IWordCard from '../../../../types/interfaces/words';
import renderAudioWindowGame from '../AudioWindowGame/audioWindowGame';

export const audiotState = {
  audioData: [] as IWordCard[],
  currentGroup: 0,
  currentPage: 0,
  prevCircle: '' as HTMLElement | string,
};

function renderStartAudioScreen() {
  const main = document.querySelector('main') as HTMLElement;

  if (generalState.currentData.length) {
    audiotState.audioData = [...generalState.currentData];
  }

  const html = `
                <div class="game-wrapper">
                  <div class="game-overlay">
                    <div class="start-screen-window">
                      <div class="start-screen__header">
                          <p class="start-screen__title">Audiocall</p>
                          <p class="start-screen__text">Audiocall training improves your listening comprehension.</p>
                      </div>
                      <div class="start-screen__main">
                          ${
                            !generalState.currentData.length
                              ? `<div class="start-screen-levels__title">Сhoose a level:</div>
                          <ul class="start-screen-levels__list">
                              <li data-group="0">A1</li>
                              <li data-group="1">A2</li>
                              <li data-group="2">B1</li>
                              <li data-group="3">B2</li>
                              <li data-group="4">C1</li>
                              <li data-group="5">C2</li>
                          </ul>`
                              : ''
                          }
                          <button class="start-screen__btn" ${
                            !generalState.currentData.length ? 'disabled' : ''
                          }>Start</button>
                    </div>
                  </div>
                </div>


  `;

  main.insertAdjacentHTML('beforeend', html);

  handleStartSprintScreenListeners();
}

function handleStartSprintScreenListeners() {
  const startBtn = document.querySelector('.start-screen__btn');
  const levelsList = document.querySelector('.start-screen-levels__list');

  startBtn?.addEventListener('click', renderAudioWindowGame);
  levelsList?.addEventListener('click', handleLevel);
}

async function handleLevel(event: Event) {
  const target = event.target as HTMLElement;

  if (target.nodeName === 'LI') {
    if (audiotState.prevCircle) {
      removeStyles();
    }
    audiotState.currentGroup = Number(target.getAttribute('data-group'));
    addStyles(target);
    handleRandomData();
    audiotState.prevCircle = target;
  }
}

export async function handleRandomData() {
  const page = getRandomPage();

  audiotState.currentPage = page;

  audiotState.audioData = await getAllWords(audiotState.currentGroup, page);
}

function removeStyles() {
  (audiotState.prevCircle as HTMLElement).classList.remove(
    'active-sprint__level'
  );
}

function addStyles(circle: HTMLElement) {
  const startBtn = document.querySelector(
    '.start-screen__btn'
  ) as HTMLButtonElement;

  circle.classList.add('active-sprint__level');
  startBtn.disabled = false;
}

export function getRandomPage() {
  return Math.ceil(Math.random() * 30);
}

export default renderStartAudioScreen;
