import {
  handleAudioGame, handleGroup, handlePlayAudio
} from './game';
import { endGame } from './render';
import { state } from './state';

export function listenerChooseGroup() {
  const groupButton = document.querySelector('#group') as HTMLElement;
  groupButton.addEventListener('click', handleGroup);
}

export function listenerAnswer() {
  const wordsButtons = document.querySelector('.wrapper-words') as HTMLElement;
  const audioButton = document.querySelector('.audio-img ') as HTMLElement;
  if (state.countAnswer > 19) {
    endGame();
  }
  wordsButtons.addEventListener('click', handleAudioGame);
  audioButton.addEventListener('click', handlePlayAudio);
}

export function listenerStatistic() {
  const playButton = document.querySelector('#play') as HTMLElement;

  playButton.addEventListener('click', handlePlayAudio);
}
