import './style.scss';
import IWordCard from '../../../../types/interfaces/words';
import {
  audioState,
  getRandomPage,
} from '../StartScreenAudio/startScreenAudio';
import variables from '../../../../variables';
import renderAudioWords from './AudioWords/audioWords';
import getAllWords from '../../../../api/Words/WordsAPI';
import renderResultAudioGame from '../ResultAudioGame/resultAudioGame';
import handleProgress from '../../../../components/progress/progress';
import { Settings } from '../../../../types/everydayTypes/settingsType';
import { getDateToday } from '../../../../utils';
import { getUserSettings, updateUserSettings } from '../../../../api/settings-api/setting-api';
import { generalState } from '../../../../states/generalState';

export const audioGameState = {
  dataRound: [] as string[],
  randomData: [] as IWordCard[],
  currentWord: {} as IWordCard,
  trueData: [] as IWordCard[],
  falseData: [] as IWordCard[],
  isKnowRod: false,
  isChoose: false,
  currentCountRightAnswer: 0,
  maxRightAnswerInRow: [] as number[],
};

async function renderAudioWindowGame() {
  const game = document.querySelector('.game-overlay') as HTMLElement;

  audioGameState.isChoose = false;

  if (!audioState.audioData.length) {
    audioGameState.maxRightAnswerInRow.push(audioGameState.currentCountRightAnswer);

    renderResultAudioGame();

    const today = getDateToday();

    let userSettings: Settings;

    const setting = await getUserSettings(
      generalState.userId as string,
      generalState.token as string
    );

    const percentageRightAnswer = audioGameState.trueData.length /
      (audioGameState.trueData.length + audioGameState.falseData.length);

    const maxRightAnswerInRow = Math.max(...audioGameState.maxRightAnswerInRow);
    const wordsPerDay = audioGameState.trueData.length + audioGameState.falseData.length;

    if (!setting) {
      userSettings = {
        wordsPerDay,
        optional: {
          dayToday: today,
          audioGame: {
            countGame: 1,
            percentageRightAnswer,
            maxRightAnswerInRow,
          },
          sprintGame: {
            countGame: 0,
            percentageRightAnswer: 0,
            maxRightAnswerInRow: 0,
          }
        }
      };
    } else {
      userSettings = {
        wordsPerDay: wordsPerDay + setting.wordsPerDay,
        optional: {
          dayToday: today,
          audioGame: {
            countGame: setting.optional.audioGame.countGame + 1,
            percentageRightAnswer: setting.optional.audioGame.countGame ?
              (percentageRightAnswer +
                setting.optional.audioGame.percentageRightAnswer) / 2 :
              percentageRightAnswer,
            maxRightAnswerInRow
          },
          sprintGame: {
            countGame: setting.optional.sprintGame.countGame || 0,
            percentageRightAnswer: setting.optional.sprintGame.percentageRightAnswer || 0,
            maxRightAnswerInRow: setting.optional.sprintGame.maxRightAnswerInRow || 0,
          }
        }
      };
    }

    await updateUserSettings(
      generalState.userId as string,
      generalState.token as string,
      userSettings
    );

    return;
  }

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
                            ${audioGameState.dataRound
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

  if (audioGameState.isChoose) {
    return;
  }

  if (target.classList.contains('audio-words__list')) {
    return;
  }
  audioGameState.isChoose = true;
  nextRoundBtn.textContent = 'Дальше';
  handleAnswer(target);
}

function handleAnswer(word: HTMLElement) {
  if (word.textContent === audioGameState.currentWord.word) {
    handleTrueAnswer();
    word.classList.add('right-audio__answer');
    handleProgress(
      audioGameState.currentWord.id as string || audioGameState.currentWord._id as string,
      true,
      'audio-game'
    );
    audioGameState.currentCountRightAnswer += 1;
  } else {
    handleFalseAnswer();
    word.classList.add('false-audio__answer');
    handleProgress(
      audioGameState.currentWord.id as string || audioGameState.currentWord._id as string,
      false,
      'audio-game'
    );
    audioGameState.maxRightAnswerInRow.push(audioGameState.currentCountRightAnswer);
    audioGameState.currentCountRightAnswer = 0;
  }

  handleImage();
}

function handleImage() {
  const imageBlock = document.querySelector(
    '.audio-image__block'
  ) as HTMLElement;

  imageBlock.style.backgroundImage = `url(${variables.URL}/${audioGameState.currentWord.image})`;
}

function handleTrueAnswer() {
  audioGameState.trueData.push(audioGameState.currentWord);
}

function handleFalseAnswer() {
  audioGameState.falseData.push(audioGameState.currentWord);
}

async function handleRound() {
  startGame();
  handleAudioData();
  await handleDataRound();
}

async function handleDataRound() {
  audioGameState.dataRound = [];
  audioGameState.dataRound.push(audioGameState.currentWord.word);

  const page = getRandomPage();

  audioGameState.randomData = await getAllWords(audioState.currentGroup, page);

  for (let i = 0; i < 3; i += 1) {
    const number = getRandomNumber(audioGameState.randomData.length);
    const newWord = audioGameState.randomData[number].word;
    audioGameState.dataRound.push(newWord);
    audioGameState.randomData = audioGameState.randomData.filter(
      (obj) => obj.word !== newWord
    );
  }

  shuffleArray();
}

function handleAudioData() {
  audioState.audioData = audioState.audioData.filter(
    (obj) => obj.word !== audioGameState.currentWord.word
  );
}

function shuffleArray() {
  for (let i = audioGameState.dataRound.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [audioGameState.dataRound[i], audioGameState.dataRound[j]] = [
      audioGameState.dataRound[j],
      audioGameState.dataRound[i],
    ];
  }
}

function startGame() {
  handleCurrentWord();

  playAudio();
}

function playAudio() {
  const audio = new Audio(
    `${variables.URL}/${audioGameState.currentWord.audio}`
  );

  audio.play();
}

function handleCurrentWord() {
  const number = getRandomNumber(audioState.audioData.length);

  audioGameState.currentWord = audioState.audioData[number];
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export default renderAudioWindowGame;
