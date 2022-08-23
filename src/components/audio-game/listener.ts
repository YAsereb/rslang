import { handleAudioGame, handlePlayAudio } from './game';

export default function listener() {
  const wordsButtons = document.querySelector('.wrapper-words') as HTMLElement;
  const audioButton = document.querySelector('.audio-img ') as HTMLElement;

  wordsButtons.addEventListener('click', handleAudioGame);
  audioButton?.addEventListener('click', handlePlayAudio);
}
