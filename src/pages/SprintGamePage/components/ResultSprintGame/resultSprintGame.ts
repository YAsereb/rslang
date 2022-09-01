import getAllWords from '../../../../api/Words/WordsAPI';
import renderResultWord from '../ResultWord/resultWord';
import renderSprintWindowGame, {
  sprintGameState,
} from '../SprintWindowGame/sprintWindowGame';
import {
  getRandomPage,
  sprintState,
} from '../StartScreenSprint/startScreenSprint';
import './style.scss';

function renderResultSprintGame() {
  const main = document.querySelector('main') as HTMLElement;

  main.innerHTML = '';

  console.log(sprintGameState.trueData);
  console.log(sprintGameState.falseData);

  const html = `
                <div class="result-wrapper">
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
                        <ul class="result-true__list">
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
                        <ul class="result-false__list">
                           ${sprintGameState.falseData
                             .map((word) => renderResultWord(word))
                             .join('')}  
                        </ul>
                    </div>`
                            : ''
                        }
                    </div>
                    <button class="play-again__btn">Again</button>
                  </div>
                </div>
  
    `;

  main.insertAdjacentHTML('beforeend', html);

  handleResultSprintListeners();
}

function handleResultSprintListeners() {
  const playAgainBtn = document.querySelector('.play-again__btn');

  playAgainBtn?.addEventListener('click', playAgain);
}

async function playAgain() {
  const page = getRandomPage();

  sprintState.data = await getAllWords(sprintState.cuurentGroup, page);

  renderSprintWindowGame();
}

export default renderResultSprintGame;
