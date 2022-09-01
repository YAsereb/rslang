import IWordCard from '../../../../types/interfaces/words';
import renderResultSprintGame from '../ResultSprintGame/resultSprintGame';
import { sprintState } from '../StartScreenSprint/startScreenSprint';
import './style.scss';

export const sprintGameState = {
  translatedWords: [] as string[],
  currentWord: {} as IWordCard,
  score: 0,
  level: 1,
  indexRight: 0,
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

  main.innerHTML = '';

  const html = `
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
  const idInterval = setInterval(() => {
    totalSeconds -= 1;
    timerElement.textContent = String(totalSeconds);
    if (totalSeconds === 0) {
      clearInterval(idInterval);
      renderResultSprintGame();
    }
  }, 1000);
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

function handleWord() {
  const number = getRandomNumber(sprintState.data.length);

  const currentWord = sprintState.data[number];
  sprintGameState.currentWord = currentWord;

  sprintState.data = sprintState.data.filter(
    (word) => word.id !== currentWord.id
  );

  handleRandomWord(currentWord);
  handleTranslatedData(currentWord);
  handleRandomTranslatedWord();
}

function handleRandomWord(currentWord: IWordCard) {
  const word = document.querySelector('.sprint-word__original') as HTMLElement;

  word.setAttribute('data-translate', currentWord.wordTranslate);

  word.textContent = currentWord.word;
}

function handleTranslatedData(currentWord: IWordCard) {
  sprintGameState.translatedWords = [];

  sprintGameState.translatedWords.push(currentWord.wordTranslate);

  const number = getRandomNumber(sprintState.data.length);

  const translatedWord = sprintState.data[number].wordTranslate;

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
  } else {
    isRight = false;
    sprintGameState.falseData.push(sprintGameState.currentWord);
  }

  handleAnswer(isRight);
}

function handleAnswer(isRight: boolean) {
  console.log(1);

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
