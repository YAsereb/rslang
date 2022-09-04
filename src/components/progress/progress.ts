import { getUserWordById, postFilterUserWord, putFilterUserWord } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';
import { PlaceLearnedWord, UserWord } from '../../types/everydayTypes/userWord';
import { setUnlearnedStatusWord, learnedWord } from '../studied-words/learned';

export default async function handleProgress(
  userId: string,
  wordId: string,
  token: string,
  answer: boolean,
  whereLearned: PlaceLearnedWord,
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
        countAttempt: 1,
        isLearned: false,
        whenLearnedDate: new Date(),
        whereLearned
      }
    };
    await postFilterUserWord(userId, token, wordId, userWord);
    console.log('нет слова');
  } else {
    console.log('есть слово');
    if (answer) {
      console.log('правильный ответ');
      userWord = {
        difficulty: word.difficulty,
        optional: {
          isLastTrueAnswer: true,
          countTrueAnswerInRow: (word.optional.countTrueAnswerInRow as number) + 1,
          countTrueAnswer: (word.optional.countTrueAnswer as number) + 1,
          countAttempt: (word.optional.countAttempt as number) + 1,
          isLearned: false,
          whenLearnedDate: new Date(),
          whereLearned
        }
      };

      userWord = learnedWord(wordId, whereLearned, word);
    } else {
      userWord = setUnlearnedStatusWord(wordId, whereLearned, word);
    }
    await putFilterUserWord(userId, token, wordId, userWord);
  }
}
