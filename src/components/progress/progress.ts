import {
  getUserWordById,
  postFilterUserWord,
  putFilterUserWord,
} from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';
import { PlaceLearnedWord, UserWord } from '../../types/everydayTypes/userWord';
import { getDateToday } from '../../utils';
import { setUnlearnedStatusWord, learnedWord } from '../studied-words/learned';

const today = getDateToday();

async function setNewWord(
  wordId: string,
  answer: boolean,
  whereLearned: PlaceLearnedWord
) {
  const userWord: UserWord = {
    difficulty: 'easy',
    optional: {
      isLastTrueAnswer: answer,
      countTrueAnswerInRow: +answer,
      countTrueAnswer: +answer,
      countAttempt: 1,
      isLearned: false,
      whenLearnedDate: today,
      whereLearned,
    },
  };

  await postFilterUserWord(
    generalState.userId as string,
    generalState.token as string,
    wordId,
    userWord
  );
}

async function updateAnswerOptional(
  wordId: string,
  answer: boolean,
  whereLearned: PlaceLearnedWord,
  word: UserWord
) {
  const currentUserWord: UserWord = {
    difficulty: word.difficulty,
    optional: word.optional,
  };
  let userWord: UserWord;
  if (answer) {
    userWord = {
      difficulty: currentUserWord.difficulty,
      optional: {
        isLastTrueAnswer: true,
        countTrueAnswerInRow:
          (currentUserWord.optional.countTrueAnswerInRow as number) + 1,
        countTrueAnswer:
          (currentUserWord.optional.countTrueAnswer as number) + 1,
        countAttempt: (currentUserWord.optional.countAttempt as number) + 1,
        isLearned: false,
        whenLearnedDate: today,
        whereLearned,
      },
    };
    userWord = learnedWord(whereLearned, currentUserWord);
  } else {
    userWord = setUnlearnedStatusWord(whereLearned, currentUserWord);
  }
  await putFilterUserWord(
    generalState.userId as string,
    generalState.token as string,
    wordId,
    userWord
  );
}

export default async function handleProgress(
  wordId: string,
  answer: boolean,
  whereLearned: PlaceLearnedWord
) {
  const word = await getUserWordById(
    generalState.userId as string,
    wordId,
    generalState.token as string
  );

  if (!word) {
    await setNewWord(wordId, answer, whereLearned);
  } else {
    await updateAnswerOptional(wordId, answer, whereLearned, word);
  }
}
