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

export async function isTrueWord(element: HTMLElement) {
  const img = document.querySelector('.audio-img') as HTMLImageElement;

  element.classList.add('winner-word');
  img.src = `../../assets/${state.imageSrc}`;
  setTimeout(await renderWords, 2000);
}

export async function isFalseWord(element: HTMLElement) {
  const img = document.querySelector('.audio-img') as HTMLImageElement;

  element.classList.add('lose-word');
  img.src = `../../assets/${state.imageSrc}`;
  setTimeout(await renderWords, 2000);
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
