import renderResultWord, {
  handleResultWordListeners,
} from '../../../../components/games/ResultWord/resultWord';
import { generalState } from '../../../../states/generalState';
import renderAudioWindowGame, {
  audioGameState,
} from '../AudioWindowGame/audioWindowGame';
import {
  audioState,
  handleRandomData,
} from '../StartScreenAudio/startScreenAudio';
import '../../../SprintGamePage/components/ResultSprintGame/style.scss';

function renderResultAudioGame() {
  const game = document.querySelector('.game-overlay') as HTMLElement;
  console.log(game);

  game.innerHTML = '';

  console.log('check');

  const html = `
                <div class="result-window">
                    <div class="result-main">
                        ${audioGameState.trueData.length
      ? `<div class="result-true">
                        <div class="result-true__title">
                            <span>Correct</span>
                            <span class="count-wrong">${audioGameState.trueData.length
      }</span>
                        </div>
                        <ul class="result-sprint__list">
                            ${audioGameState.trueData
        .map((word) => renderResultWord(word))
        .join('')}
                        </ul>
                    </div>`
      : ''
    }
                        ${audioGameState.falseData.length
      ? `<div class="result-false">
                        <div class="result-false__title">
                            <span>Mistakes</span>
                            <span>${audioGameState.falseData.length}</span>
                        </div>
                        <ul class="result-sprint__list">
                           ${audioGameState.falseData
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

  handleResultAudioListeners();
}

function handleResultAudioListeners() {
  handleResultWordListeners();
  const playAgainBtn = document.querySelector('.play-again__btn');

  playAgainBtn?.addEventListener('click', playAgain);
}

async function playAgain() {
  audioGameState.falseData = [];
  audioGameState.trueData = [];
  if (!generalState.currentData.length) {
    await handleRandomData();
  } else {
    audioState.audioData = generalState.currentData;
  }

  renderAudioWindowGame();
}

export default renderResultAudioGame;
