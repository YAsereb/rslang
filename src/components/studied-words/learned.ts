import { getUserWordById, putFilterUserWord } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';
import { PlaceLearnedWord, UserWord } from '../../types/everydayTypes/userWord';

const date = new Date();
export async function setLearnedStatusWord(
  wordId: string,
  userWord: UserWord,
  whereLearned: PlaceLearnedWord
) {
  const optional: UserWord = {
    difficulty: 'easy',
    optional: {
      isLastTrueAnswer: userWord.optional.isLastTrueAnswer,
      countTrueAnswerInRow: userWord.optional.countTrueAnswerInRow,
      countTrueAnswer: userWord.optional.countTrueAnswer,
      countAttempt: userWord.optional.countAttempt,
      isLearned: true,
      whenLearnedDate: date,
      whereLearned,
    },
  };

  await putFilterUserWord(
    generalState.userId as string,
    generalState.token as string,
    wordId,
    optional
  );
}

export async function setUnlearnedStatusWord(
  wordId: string,
  whereLearned: PlaceLearnedWord
) {
  const userWord: UserWord = (await getUserWordById(
    generalState.userId as string,
    wordId,
    generalState.token as string
  )) as UserWord;

  const optional: UserWord = {
    difficulty: userWord.difficulty,
    optional: {
      isLastTrueAnswer: userWord.optional.isLastTrueAnswer,
      countTrueAnswerInRow: userWord.optional.countTrueAnswerInRow,
      countTrueAnswer: userWord.optional.countTrueAnswer,
      countAttempt: userWord.optional.countAttempt,
      isLearned: false,
      whenLearnedDate: date,
      whereLearned,
    },
  };

  await putFilterUserWord(
    generalState.userId as string,
    generalState.token as string,
    wordId,
    optional
  );
}

export default async function learnedWord(
  wordId: string,
  whereLearned: PlaceLearnedWord
) {
  const userWord = (await getUserWordById(
    generalState.userId as string,
    wordId,
    generalState.token as string
  )) as UserWord;

  if (
    (userWord.difficulty === 'easy' &&
      (userWord.optional.countTrueAnswerInRow as number) >= 3) ||
    (userWord.difficulty === 'hard' &&
      (userWord.optional.countTrueAnswerInRow as number) >= 5)
  ) {
    await setLearnedStatusWord(wordId, userWord, whereLearned);
  }
}
