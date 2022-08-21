import getWords from './api';
import { getRandomIndex, getWordsArray } from './game';

export default async function audioGameStart() {
  const words = await getWords();
  const a = getWordsArray(words);
  console.log(a);
}
