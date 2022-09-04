import { generalState } from '../../../../states/generalState';
import renderResultWord, {
  handleResultWordListeners,
} from '../ResultWord/resultWord';
import renderSprintWindowGame, {
  sprintGameState,
} from '../SprintWindowGame/sprintWindowGame';
import {
  handleRandomData,
  sprintState,
} from '../StartScreenSprint/startScreenSprint';
import './style.scss';

function renderResultSprintGame() {
  const sprint = document.querySelector('.sprint-game') as HTMLElement;

  sprint.innerHTML = '';

  const html = `
                <div class="result-window">
                    <div class="result-title">RESULT: <span>${
                      sprintGameState.score
                    }</span></div>
                    <div class="result-main">
                        ${
                          sprintGameState.trueData.length
                            ? `<div class="result-true">
                        <div class="result-true__title">
                            <span>Correct</span>
                            <span class="count-wrong">${
                              sprintGameState.trueData.length
                            }</span>
                        </div>
                        <ul class="result-sprint__list">
                            ${sprintGameState.trueData
                              .map((word) => renderResultWord(word))
                              .join('')}
                        </ul>
                    </div>`
                            : ''
                        }
                        ${
                          sprintGameState.falseData.length
                            ? `<div class="result-false">
                        <div class="result-false__title">
                            <span>Misstakes</span>
                            <span>${sprintGameState.falseData.length}</span>
                        </div>
                        <ul class="result-sprint__list">
                           ${sprintGameState.falseData
                             .map((word) => renderResultWord(word))
                             .join('')}
                        </ul>
                    </div>`
                            : ''
                        }
                    </div>
                    <button class="play-again__btn">play again</button>
                  </div>
    `;

  sprint.insertAdjacentHTML('beforeend', html);

  handleResultSprintListeners();
}

function handleResultSprintListeners() {
  handleResultWordListeners();
  const playAgainBtn = document.querySelector('.play-again__btn');

  playAgainBtn?.addEventListener('click', playAgain);
}

async function playAgain() {
  if (!generalState.currentData.length) {
    await handleRandomData();
  } else {
    sprintState.sprintData = generalState.currentData;
  }

  renderSprintWindowGame();
}

export default renderResultSprintGame;
