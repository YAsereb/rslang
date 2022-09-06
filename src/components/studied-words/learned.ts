import { PlaceLearnedWord, UserWord } from '../../types/everydayTypes/userWord';
import { getDateToday } from '../../utils';

const today = getDateToday();

export function setLearnedStatusWord(
  userWord: UserWord,
  whereLearned: PlaceLearnedWord
) {
  const optional: UserWord = {
    difficulty: 'easy',
    optional: {
      isNew: userWord?.optional.isNew || false,
      whenSetNew: userWord?.optional.whenSetNew || '',
      isLastTrueAnswer: userWord.optional.isLastTrueAnswer,
      countTrueAnswerInRow: userWord.optional.countTrueAnswerInRow,
      countTrueAnswer: userWord.optional.countTrueAnswer,
      countAttempt: userWord.optional.countAttempt,
      isLearned: true,
      whenLearnedDate: today,
      whereLearned,
    },
  };
  return optional;
}

export function setUnlearnedStatusWord(
  whereLearned: PlaceLearnedWord,
  userWord: UserWord
) {
  console.log('неправильный ответ');

  const optional: UserWord = {
    difficulty: userWord.difficulty,
    optional: {
      isNew: userWord?.optional.isNew || false,
      whenSetNew: userWord?.optional.whenSetNew || '',
      isLastTrueAnswer: false,
      countTrueAnswerInRow: 0,
      countTrueAnswer: userWord.optional.countTrueAnswer || 0,
      countAttempt: (userWord.optional.countAttempt as number) + 1 || 0,
      isLearned: false,
      whenLearnedDate: today,
      whereLearned,
    },
  };

  return optional;
}

export function learnedWord(
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
    optional = setLearnedStatusWord(userWord, whereLearned);
  }
  optional = userWord;

  return optional;
}
