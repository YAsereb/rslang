import renderResultWord, {
  handleResultWordListeners,
} from '../../../../components/games/ResultWord/resultWord';
import { generalState } from '../../../../states/generalState';
import renderAudioWindowGame, {
  auidoGameState,
} from '../AudioWindowGame/audioWindowGame';
import {
  audiotState,
  handleRandomData,
} from '../StartScreenAudio/startScreenAudio';
import '../../../SprintGamePage/components/ResultSprintGame/style.scss';

function renderResultAudioGame() {
  const game = document.querySelector('.game-overlay') as HTMLElement;

  game.innerHTML = '';

  console.log('check');

  const html = `
                <div class="result-window">
                    <div class="result-main">
                        ${
                          auidoGameState.trueData.length
                            ? `<div class="result-true">
                        <div class="result-true__title">
                            <span>Correct</span>
                            <span class="count-wrong">${
                              auidoGameState.trueData.length
                            }</span>
                        </div>
                        <ul class="result-sprint__list">
                            ${auidoGameState.trueData
                              .map((word) => renderResultWord(word))
                              .join('')}
                        </ul>
                    </div>`
                            : ''
                        }
                        ${
                          auidoGameState.falseData.length
                            ? `<div class="result-false">
                        <div class="result-false__title">
                            <span>Misstakes</span>
                            <span>${auidoGameState.falseData.length}</span>
                        </div>
                        <ul class="result-sprint__list">
                           ${auidoGameState.falseData
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

  game.insertAdjacentHTML('beforeend', html);

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
    audiotState.audioData = generalState.currentData;
  }

  renderAudioWindowGame();
}

export default renderResultAudioGame;
