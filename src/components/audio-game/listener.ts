import {
  handleAudioGame, handleGroup, handlePlayAudio, playAudioEndGame
} from './game';
import { endGame } from './render';
import { audioGameState } from './state';

export function listenerChooseGroup() {
  const groupButton = document.querySelector('#group') as HTMLElement;
  groupButton.addEventListener('click', handleGroup);
}

export function listenerAnswer() {
  const wordsButtons = document.querySelector('.wrapper-words') as HTMLElement;
  const audioButton = document.querySelector('.audio-img ') as HTMLElement;

  if (audioGameState.countAnswer > 19) {
    endGame();
  }

  wordsButtons.addEventListener('click', handleAudioGame);
  audioButton.addEventListener('click', handlePlayAudio);
}

export function listenerStatistic() {
  const playButtons = document.querySelectorAll('#play');

  playButtons.forEach((button) => {
    button.addEventListener('click', playAudioEndGame);
  });
}
