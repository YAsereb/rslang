import { getUserWordById, putFilterUserWord } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';
import { PlaceLearnedWord, UserWord } from '../../types/everydayTypes/userWord';

const date = new Date();

export function setLearnedStatusWord(
  wordId: string,
  userWord: UserWord,
  whereLearned: PlaceLearnedWord
) {
  console.log('слово изучено');

  const optional: UserWord = {
    difficulty: 'easy',
    optional: {
      isLastTrueAnswer: userWord.optional.isLastTrueAnswer,
      countTrueAnswerInRow: userWord.optional.countTrueAnswerInRow,
      countTrueAnswer: userWord.optional.countTrueAnswer,
      countAttempt: userWord.optional.countAttempt,
      isLearned: true,
      whenLearnedDate: date,
      whereLearned
    },
  };
  return optional;
}

export function setUnlearnedStatusWord(
  wordId: string,
  whereLearned: PlaceLearnedWord,
  userWord: UserWord
) {
  console.log('неправильный ответ');

  const optional: UserWord = {
    difficulty: userWord.difficulty,
    optional: {
      isLastTrueAnswer: false,
      countTrueAnswerInRow: 0,
      countTrueAnswer: userWord.optional.countTrueAnswer as number,
      countAttempt: (userWord.optional.countAttempt as number) + 1,
      isLearned: false,
      whenLearnedDate: date,
      whereLearned
    },
  };
  return optional;
}

export function learnedWord(
  wordId: string,
  whereLearned: PlaceLearnedWord,
  userWord: UserWord
) {
  let optional: UserWord;
  if (
    (userWord.difficulty === 'easy' &&
      (userWord.optional.countTrueAnswerInRow as number) >= 3) ||
    (userWord.difficulty === 'hard' &&
      (userWord.optional.countTrueAnswerInRow as number) >= 5)
  ) {
    optional = setLearnedStatusWord(wordId, userWord, whereLearned);
  } optional = userWord;

  return optional;
}
