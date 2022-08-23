import { Words } from '../../types';
import { renderWords } from './render';
import { state } from './state';

export function getRandomIndex(words: Words) {
  const randomIndex = Math.floor((Math.random() * words.length));
  return randomIndex;
}
export function getWordsArray(words: Words) {
  const trueIndex = getRandomIndex(words);
  const trueWord = words[trueIndex];

  state.trueWordAudio = trueWord.audio;
  state.trueWordAudioExample = trueWord.audioExample;
  state.trueWordId = trueWord.id;
  state.imageSrc = trueWord.image;

  let i = 0;
  const wordsArray: Words = [trueWord];

  while (i < 4) {
    const randomIndex = getRandomIndex(words);
    if (trueIndex !== randomIndex && !wordsArray.includes(words[randomIndex])) {
      wordsArray.push(words[randomIndex]);
      i += 1;
    }
  }
  wordsArray.sort((a, b) => (a.id > b.id ? -1 : 1));
  return wordsArray;
}

async function handleAnswer() {
  const img = document.querySelector('.audio-img') as HTMLImageElement;
  img.src = `../../assets/${state.imageSrc}`;
  state.countAnswer += 1;
  setTimeout(await renderWords, 2000);
}

export async function isTrueWord(element: HTMLElement) {
  element.classList.add('winner-word');
  handleAnswer();
}

export async function isFalseWord(element: HTMLElement) {
  element.classList.add('lose-word');
  handleAnswer();
}

export function handleAudioGame(event: Event) {
  const target = event.target as HTMLElement;

  if (!target.hasAttribute('id')) return;

  const id = target.getAttribute('id');

  if (id === state.trueWordId) {
    isTrueWord(target);
  } else {
    isFalseWord(target);
  }
}

export function handlePlayAudio() {
  const audioPlayer = document.querySelector('audio') as HTMLAudioElement;
  audioPlayer.load();
  audioPlayer.play();
}
