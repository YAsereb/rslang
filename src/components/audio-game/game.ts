import { Words } from '../../types';
// import { getWord } from './api';
import { state } from './state';

export function getRandomIndex(words: Words) {
  const randomIndex = Math.floor((Math.random() * words.length));
  return randomIndex;
}

// export async function getAudioSrc(id: string) {
//   const word = await getWord(id);
//   const src = word.audioExample;
//   return src;
// }

export function getWordsArray(words: Words) {
  const trueIndex = getRandomIndex(words);
  const trueWord = words[trueIndex];

  state.trueWordAudio = trueWord.audio;
  state.trueWordAudioExample = trueWord.audioExample;

  console.log(trueWord);
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
