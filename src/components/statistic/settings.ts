import { getAllUserWords } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';

import { getDateToday } from '../../utils';

export async function getNewWordsToday() {
  const today = getDateToday();

  const userWords = await getAllUserWords(
    generalState.userId as string,
    generalState.token as string
  );

  const todayNewWords = userWords.filter(
    (word) => (word.optional.isNew === true && word.optional.whenSetNew === today)
  );
  return todayNewWords;
}

export async function getLearnedWordsToday() {
  const today = getDateToday();

  const userWords = await getAllUserWords(
    generalState.userId as string,
    generalState.token as string
  );

  const todayLearnedWords = userWords.filter(
    (word) => (word.optional.isLearned === true && word.optional.whenLearnedDate === today)
  );
  return todayLearnedWords;
}
