import { getUserWordById, postFilterUserWord } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';
import { UserWord } from '../../types/everydayTypes/userWord';

export default async function handleProgress(
  userId: string,
  wordId: string,
  token: string,
  answer: boolean
) {
  const word = await getUserWordById(
    (generalState.userId as string),
    wordId,
    (generalState.token as string),
  );
  let userWord: UserWord;

  if (!word) {
    userWord = {
      difficulty: 'easy',
      optional: {
        isLastTrueAnswer: answer,
        countTrueAnswerInRow: +answer,
        countTrueAnswer: +answer,
        countAttempt: 1
      }
    };
  } else {
    userWord = {
      difficulty: word.difficulty,
      optional: {
        isLastTrueAnswer: answer,
        countTrueAnswerInRow: answer ? (word.optional.countTrueAnswerInRow as number) + 1 : 0,
        countTrueAnswer: answer ? (word.optional.countTrueAnswer as number) + 1
          : word.optional.countTrueAnswer,
        countAttempt: (word.optional.countAttempt as number) + 1
      }
    };
  }

  postFilterUserWord(userId, token, wordId, userWord);
}
