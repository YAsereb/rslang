import { getUserWordById } from '../../api/Words/WordsAPI';
import { IUserWord } from '../../types/interfaces/words';

// import getUserId from '../../utils';
// const filter = {
//   isNew: true,
// };

export default async function handleProgress(userId: string, wordId: string, token: string) {
  const word = await getUserWordById(userId, wordId, token);
  // if (word) {

  // }

  return false;
}

// export function addWord() {
// }

// export async function progressWord() {
//   return { word.guessCount, word.totalAttempt }
// }
