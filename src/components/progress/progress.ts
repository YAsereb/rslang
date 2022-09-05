import { getUserWordById, postFilterUserWord, putFilterUserWord } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';
import { PlaceLearnedWord, UserWord } from '../../types/everydayTypes/userWord';
import { setUnlearnedStatusWord, learnedWord } from '../studied-words/learned';

async function setNewWord(wordId: string, answer: boolean, whereLearned: PlaceLearnedWord) {
  const userWord: UserWord = {
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
  console.log(word);
  const currentUserWord: UserWord = {
    difficulty: word.difficulty,
    optional: word.optional
  };
  let userWord: UserWord;
  if (answer) {
    console.log('правильный ответ');
    userWord = {
      difficulty: currentUserWord.difficulty,
      optional: {
        isLastTrueAnswer: true,
        countTrueAnswerInRow: (currentUserWord.optional.countTrueAnswerInRow as number) + 1,
        countTrueAnswer: (currentUserWord.optional.countTrueAnswer as number) + 1,
        countAttempt: (currentUserWord.optional.countAttempt as number) + 1,
        isLearned: false,
        whenLearnedDate: new Date(),
        whereLearned
      }
    };
    userWord = learnedWord(whereLearned, currentUserWord);
  } else {
    userWord = setUnlearnedStatusWord(whereLearned, currentUserWord);
  }

  console.log(userWord);
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
  whereLearned: PlaceLearnedWord,
) {
  const word = await getUserWordById(
    generalState.userId as string,
    wordId,
    generalState.token as string
  );
  console.log(word);

  if (!word) {
    console.log('нет слова');
    await setNewWord(wordId, answer, whereLearned);
  } else {
    console.log('есть слово');
    await updateAnswerOptional(wordId, answer, whereLearned, word);
  }
}
