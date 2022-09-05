import { PlaceLearnedWord, UserWord } from '../../types/everydayTypes/userWord';

const date = new Date();

export function setLearnedStatusWord(
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
  whereLearned: PlaceLearnedWord,
  userWord: UserWord
) {
  const optional: UserWord = {
    difficulty: userWord.difficulty,
    optional: {
      isLastTrueAnswer: false,
      countTrueAnswerInRow: 0,
      countTrueAnswer: userWord.optional.countTrueAnswer || 0,
      countAttempt: userWord.optional.countAttempt as number + 1 || 0,
      isLearned: false,
      whenLearnedDate: date,
      whereLearned
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
  } optional = userWord;

  return optional;
}
