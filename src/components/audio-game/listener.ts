import {
  handleAudioGame, handleGroup, handlePlayAudio, viewStatisticGame
} from './game';
import { state } from './state';

export function listenerChooseGroup() {
  const groupButton = document.querySelector('#group') as HTMLElement;
  groupButton.addEventListener('click', handleGroup);
}

export function listenerAnswer() {
  const wordsButtons = document.querySelector('.wrapper-words') as HTMLElement;
  const audioButton = document.querySelector('.audio-img ') as HTMLElement;

  wordsButtons.addEventListener('click', handleAudioGame);
  audioButton.addEventListener('click', handlePlayAudio);
  if (state.countAnswer > 20) viewStatisticGame();
}
