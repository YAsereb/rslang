import getAllWords, {
  getAggregatedWords,
} from '../../../../api/Words/WordsAPI';
import handleProgress from '../../../../components/progress/progress';
import learnedWord, { setUnlearnedStatusWord } from '../../../../components/studied-words/learned';
import { generalState } from '../../../../states/generalState';
import IWordCard from '../../../../types/interfaces/words';
import dicAndBookVars from '../../../DictionaryBookPages';
import renderResultSprintGame from '../ResultSprintGame/resultSprintGame';
import {
  handleRandomData,
  sprintState,
} from '../StartScreenSprint/startScreenSprint';
import './style.scss';

export const sprintGameState = {
  translatedWords: [] as string[],
  currentWord: {} as IWordCard,
  score: 0,
  level: 1,
  indexRight: 0,
  indexPrevPage: 0,
  idInterval: '' as NodeJS.Timer | string,
  trueData: [] as IWordCard[],
  falseData: [] as IWordCard[],
};

function renderSprintWindowGame() {
  const main = document.querySelector('main') as HTMLElement;

  sprintGameState.score = 0;
  sprintGameState.level = 1;
  sprintGameState.indexRight = 0;
  sprintGameState.trueData = [];
  sprintGameState.falseData = [];
  sprintGameState.indexPrevPage = 0;

  main.innerHTML = '';

  const html = `
                <div class="start-screen-img">
                  <div class="sprint-wrapper">
                    <div class="sprint-window">
                        <div class="score-sprint">Score: <span>0</span></div>
                        <div class="sprint-block">
                            <div class="sprint-main__block">
                                <div class="sprint-timer">10</div>
                                <div class="sprint-answers">
                                    <div data-right='1'></div>
                                    <div data-right='2'></div>
                                    <div data-right='3'></div>
                                </div>
                                <div class="sprint-word__block">
                                    <div class="sprint-word__original"></div>
                                    <div class="sprint-word__translate"></div>
                                </div>
                            </div>
                            <div class="sprint-footer__block">
                                <button>True</button>
                                <button>False</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
  `;

  main.insertAdjacentHTML('beforeend', html);

  handleSprintGameListeners();
  handleSprintGameState();
}

function handleSprintGameListeners() {
  const btnsBlock = document.querySelector('.sprint-footer__block');

  btnsBlock?.addEventListener('click', handleAnswerListener);
}

function handleSprintGameState() {
  startTimer();
  handleWord();
}

function startTimer() {
  const timerElement = document.querySelector('.sprint-timer') as HTMLElement;
  let totalSeconds = Number(timerElement.textContent);
  sprintGameState.idInterval = setInterval(() => {
    totalSeconds -= 1;
    timerElement.textContent = String(totalSeconds);
    window.addEventListener(
      'hashchange',
      () => {
        clearInterval(sprintGameState.idInterval as NodeJS.Timer);
      },
      { once: true }
    );

    if (totalSeconds === 0) {
      clearInterval(sprintGameState.idInterval as NodeJS.Timer);
      renderResultSprintGame();
    }
  }, 1000);
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

async function handleWord() {
  if (!sprintState.sprintData.length) {
    sprintGameState.indexPrevPage += 1;
    await handleSprintData();

    if (!sprintState.sprintData.length) {
      renderResultSprintGame();
      clearInterval(sprintGameState.idInterval as NodeJS.Timer);
      return;
    }
  }

  const number = getRandomNumber(sprintState.sprintData.length);

  sprintGameState.currentWord = sprintState.sprintData[number];

  handleRandomWord();
  handleTranslatedData();
  handleRandomTranslatedWord();

  sprintState.sprintData = sprintState.sprintData.filter(
    (word) => word.word !== sprintGameState.currentWord.word
  );
}

export async function handleSprintData() {
  if (generalState.previousURL === 'book') {
    if (generalState.token) {
      const filter = JSON.stringify({
        $and: [
          {
            page:
              dicAndBookVars.currentPage - 1 - sprintGameState.indexPrevPage,
          },
          { group: dicAndBookVars.currentGroup },
          {
            $or: [
              { 'userWord.optional.isDeleted': false },
              { 'userWord.optional.isDeleted': null },
            ],
          },

          {
            $or: [
              { userWord: null },
              { 'userWord.difficulty': 'hard' },
              { 'userWord.difficulty': 'easy' },
            ],
          },
        ],
      });

      sprintState.sprintData = await getAggregatedWords(
        generalState.userId as string,
        generalState.token as string,
        dicAndBookVars.bookLimit,
        filter
      );
    } else {
      console.log(sprintState.cuurentPage);

      sprintState.sprintData = await getAllWords(
        dicAndBookVars.currentGroup,
        dicAndBookVars.currentPage - sprintGameState.indexPrevPage
      );
    }
  } else if (generalState.previousURL === 'dictionary') {
    sprintState.sprintData = [];
  } else {
    await handleRandomData();
  }
}

function handleRandomWord() {
  const word = document.querySelector('.sprint-word__original') as HTMLElement;

  word.setAttribute(
    'data-translate',
    sprintGameState.currentWord.wordTranslate
  );

  word.textContent = sprintGameState.currentWord.word;
}

function handleTranslatedData() {
  sprintGameState.translatedWords = [];

  sprintGameState.translatedWords.push(
    sprintGameState.currentWord.wordTranslate
  );

  const number = getRandomNumber(sprintState.sprintData.length);

  console.log(sprintState.sprintData);

  const translatedWord = sprintState.sprintData[number].wordTranslate;

  sprintGameState.translatedWords.push(translatedWord);
}

function handleRandomTranslatedWord() {
  const translatedWord = document.querySelector(
    '.sprint-word__translate'
  ) as HTMLElement;

  const number = getRandomNumber(sprintGameState.translatedWords.length);

  translatedWord.textContent = sprintGameState.translatedWords[number];
}

function handleAnswerListener(event: Event) {
  const target = event.target as HTMLElement;

  if (target.textContent === 'True') {
    handleTrueAnswer();
  } else if (target.textContent === 'False') {
    handleFalseAnswer();
  } else {
    return;
  }

  handleWord();
}

function handleTrueAnswer() {
  const word = document.querySelector('.sprint-word__original') as HTMLElement;
  const translatedWord = document.querySelector(
    '.sprint-word__translate'
  ) as HTMLElement;
  const translateAttribute = word.getAttribute('data-translate');
  let isRight = null;

  if (translatedWord.textContent === translateAttribute) {
    isRight = true;
    updateScore();
    sprintGameState.trueData.push(sprintGameState.currentWord);

    handleProgress(
      generalState.userId as string,
      generalState.token as string,
      sprintGameState.currentWord.id as string || sprintGameState.currentWord.id as string,
      true
    );
    learnedWord(sprintGameState.currentWord.id as string || sprintGameState.currentWord.id as string, 'sprint-game');
  } else {
    sprintGameState.falseData.push(sprintGameState.currentWord);
    isRight = false;
  }

  handleAnswer(isRight);
}

function handleFalseAnswer() {
  const word = document.querySelector('.sprint-word__original') as HTMLElement;
  const translatedWord = document.querySelector(
    '.sprint-word__translate'
  ) as HTMLElement;
  const translateAttribute = word.getAttribute('data-translate');
  let isRight = null;

  if (translatedWord.textContent !== translateAttribute) {
    isRight = true;
    updateScore();
    sprintGameState.trueData.push(sprintGameState.currentWord);

    handleProgress(
      generalState.userId as string,
      generalState.token as string,
      sprintGameState.currentWord.id as string || sprintGameState.currentWord.id as string,
      false
    );
    setUnlearnedStatusWord(sprintGameState.currentWord.id as string || sprintGameState.currentWord.id as string, 'sprint-game');
  } else {
    isRight = false;
    sprintGameState.falseData.push(sprintGameState.currentWord);
  }

  handleAnswer(isRight);
}

function handleAnswer(isRight: boolean) {
  if (isRight) {
    sprintGameState.indexRight += 1;

    const circle = document.querySelector(
      `[data-right="${sprintGameState.indexRight}"]`
    );

    circle?.classList.add('active-circle');

    if (sprintGameState.indexRight === 3) {
      sprintGameState.level += 1;
      sprintGameState.indexRight = 0;
      removeActiveCircles();
    }
  } else {
    removeActiveCircles();

    sprintGameState.level = 1;
    sprintGameState.indexRight = 0;
  }
}

function updateScore() {
  const score = document.querySelector('.score-sprint') as HTMLElement;

  sprintGameState.score += 10 * sprintGameState.level;

  score.textContent = String(sprintGameState.score);
}

function removeActiveCircles() {
  const circles = document.querySelectorAll('.sprint-answers div');

  circles.forEach((circle) => circle.classList.remove('active-circle'));
}

export default renderSprintWindowGame;
