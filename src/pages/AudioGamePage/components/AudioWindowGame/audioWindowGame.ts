import './style.scss';
import IWordCard from '../../../../types/interfaces/words';
import {
  audiotState,
  getRandomPage,
} from '../StartScreenAudio/startScreenAudio';
import variables from '../../../../variables';
import renderAudioWords from './AudioWords/audioWords';
import getAllWords from '../../../../api/Words/WordsAPI';
import renderResultAudioGame from '../ResultAudioGame/resultAudioGame';

export const auidoGameState = {
  dataRound: [] as string[],
  randomData: [] as IWordCard[],
  currentWord: {} as IWordCard,
  trueData: [] as IWordCard[],
  falseData: [] as IWordCard[],
  isKnowRod: false,
  isChoose: false,
};

async function renderAudioWindowGame() {
  const game = document.querySelector('.game-overlay') as HTMLElement;

  auidoGameState.isChoose = false;

  console.log(audiotState.audioData);

  await handleRound();

  game.innerHTML = '';

  const html = `
                      <div class="audio-window">
                          <button class="play-audio__sound">
                            <svg>
                                <use xlink: href = "./assets/svg/sprite/general.svg#sound" ></use>
                            </svg>
                          </button>
                          <div class="audio-image__block"></div>
                          <ul class="audio-words__list">
                            ${auidoGameState.dataRound
                              .map((word) => renderAudioWords(word))
                              .join('')}
                          </ul>
                          <button class="next-audio__btn">Не знаю</button>
                      </div>
    `;

  game.insertAdjacentHTML('beforeend', html);

  handleAudioGameListeners();
}

function handleAudioGameListeners() {
  const audioBtn = document.querySelector('.play-audio__sound');
  const list = document.querySelector('.audio-words__list');
  const nextRoundBtn = document.querySelector('.next-audio__btn');

  nextRoundBtn?.addEventListener('click', renderAudioWindowGame);
  audioBtn?.addEventListener('click', playAudio);
  list?.addEventListener('click', handleList);
}

function handleList(event: Event) {
  const target = event.target as HTMLElement;
  const nextRoundBtn = document.querySelector(
    '.next-audio__btn'
  ) as HTMLElement;

  if (auidoGameState.isChoose) {
    return;
  }

  if (target.classList.contains('audio-words__list')) {
    return;
  }
  auidoGameState.isChoose = true;
  nextRoundBtn.textContent = 'Дальше';
  handleAnswer(target);
}

function handleAnswer(word: HTMLElement) {
  if (word.textContent === auidoGameState.currentWord.word) {
    handleTrueAnser();
    word.classList.add('right-audio__answer');
  } else {
    handleFalseAnswer();
    word.classList.add('false-audio__answer');
  }

  handleImage();
}

function handleImage() {
  const imageBlock = document.querySelector(
    '.audio-image__block'
  ) as HTMLElement;

  imageBlock.style.backgroundImage = `url(${variables.URL}/${auidoGameState.currentWord.image})`;
}

function handleTrueAnser() {
  auidoGameState.trueData.push(auidoGameState.currentWord);
}

function handleFalseAnswer() {
  auidoGameState.falseData.push(auidoGameState.currentWord);
}

async function handleRound() {
  if (!audiotState.audioData.length) {
    console.log(1);

    renderResultAudioGame();
    return;
  }

  console.log(2);

  startGame();
  handleAudioData();
  await handleDataRound();
}

async function handleDataRound() {
  auidoGameState.dataRound = [];
  auidoGameState.dataRound.push(auidoGameState.currentWord.word);

  const page = getRandomPage();

  auidoGameState.randomData = await getAllWords(audiotState.currentGroup, page);

  for (let i = 0; i < 3; i += 1) {
    const number = getRandomNumber(auidoGameState.randomData.length);
    const newWord = auidoGameState.randomData[number].word;
    auidoGameState.dataRound.push(newWord);
    auidoGameState.randomData = auidoGameState.randomData.filter(
      (obj) => obj.word !== newWord
    );
  }

  shuffleArray();
}

function handleAudioData() {
  audiotState.audioData = audiotState.audioData.filter(
    (obj) => obj.word !== auidoGameState.currentWord.word
  );
}

function shuffleArray() {
  for (let i = auidoGameState.dataRound.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [auidoGameState.dataRound[i], auidoGameState.dataRound[j]] = [
      auidoGameState.dataRound[j],
      auidoGameState.dataRound[i],
    ];
  }
}

function startGame() {
  handleCurrentWord();

  playAudio();
}

function playAudio() {
  const audio = new Audio(
    `${variables.URL}/${auidoGameState.currentWord.audio}`
  );

  audio.play();
}

function handleCurrentWord() {
  const number = getRandomNumber(audiotState.audioData.length);

  auidoGameState.currentWord = audiotState.audioData[number];
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export default renderAudioWindowGame;
