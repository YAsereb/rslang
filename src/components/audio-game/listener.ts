import { handleAudioGame } from './game';

export default function listener() {
  const wordsButtons = document.querySelector('.wrapper-words') as HTMLElement;
  wordsButtons.addEventListener('click', handleAudioGame);
}
