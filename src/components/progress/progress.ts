import { getUserWordById } from '../../api/Words/WordsAPI';

// import getUserId from '../../utils';
// const filter = {
//   isNew: true,
// };

export default async function handleProgress(
  userId: string,
  wordId: string,
  token: string
) {
  const word = await getUserWordById(userId, wordId, token);
  console.log(word);

  // if (word) {

  // }

  return false;
}

// export function addWord() {
// }

// export async function progressWord() {
//   return { word.guessCount, word.totalAttempt }
// }
