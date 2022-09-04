import { getUserStatistic, updateUserStatistic } from '../../api/statistic/statistic-api';
import { getUserWordById, putFilterUserWord } from '../../api/Words/WordsAPI';
import { getHash } from '../../router';
import { generalState } from '../../states/generalState';
import { OptionalStatistic, Statistic } from '../../types/everydayTypes/statisticType';
import { UserWord } from '../../types/everydayTypes/userWord';

async function setLearnedStatusWord(wordId: string, userWord: UserWord) {
  const optional: UserWord = {
    difficulty: 'easy',
    optional: {
      isLastTrueAnswer: userWord.optional.isLastTrueAnswer,
      countTrueAnswerInRow: userWord.optional.countTrueAnswerInRow,
      countTrueAnswer: userWord.optional.countTrueAnswer,
      countAttempt: userWord.optional.countAttempt,
      isLearned: true,
    },
  };

  await putFilterUserWord(
    generalState.userId as string,
    generalState.token as string,
    wordId,
    optional
  );

  const userStatistic = await getUserStatistic(
    generalState.userId as string,
    generalState.token as string
  );

  let statisticOptional: OptionalStatistic;
  const hash = getHash();

  if (hash === 'audiocall') {
    statisticOptional = {
      audioWords: (userStatistic.optional.audioWords as string[]).concat(wordId),
      sprintWords: userStatistic.optional.sprintWords as string[],
      cardWords: userStatistic.optional.sprintWords as string[],
    };
  }
  if (hash === 'sprint') {
    statisticOptional = {
      audioWords: userStatistic.optional.audioWords as string[],
      sprintWords: (userStatistic.optional.sprintWords as string[]).concat(wordId),
      cardWords: userStatistic.optional.sprintWords as string[],
    };
  }
  statisticOptional = {
    audioWords: userStatistic.optional.audioWords as string[],
    sprintWords: userStatistic.optional.sprintWords as string[],
    cardWords: (userStatistic.optional.sprintWords as string[]).concat(wordId),
  };

  const statistic: Statistic = {
    learnedWords: userStatistic.learnedWords + 1,
    optional: statisticOptional,
  };

  await updateUserStatistic(
    generalState.userId as string,
    generalState.token as string,
    statistic
  );
}

export async function setUnlearnedStatusWord(wordId: string) {
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
    },
  };

  await putFilterUserWord(
    generalState.userId as string,
    generalState.token as string,
    wordId,
    optional
  );
}

export default async function learnedWord(wordId: string) {
  const userWord = await getUserWordById(
    generalState.userId as string,
    wordId,
    generalState.token as string
  ) as UserWord;

  if (
    (userWord.difficulty === 'easy' &&
      (userWord.optional.countTrueAnswerInRow as number) >= 3) ||
    (userWord.difficulty === 'hard' &&
      (userWord.optional.countTrueAnswerInRow as number) >= 5)
  ) {
    await setLearnedStatusWord(wordId, userWord);
  }
}
