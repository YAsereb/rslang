import { Words } from '../../types';

export function getRandomIndex(words: Words) {
  const randomIndex = Math.floor((Math.random() * words.length));
  return randomIndex;
}

export function getWordsArray(words: Words) {
  const trueIndex = getRandomIndex(words);
  console.log(trueIndex);
  console.log(words[trueIndex]);
  let i = 0;
  const wordsArray: Words = [];
  while (i < 3) {
    const randomIndex = getRandomIndex(words);
    if (trueIndex !== randomIndex && !wordsArray.includes(words[randomIndex])) {
      wordsArray.push(words[randomIndex]);
      i += 1;
    }
  }
  return wordsArray;
}
