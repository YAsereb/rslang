import { getUserStatistic } from '../../api/statistic/statistic';
import { getUserWordById, getWord } from '../../api/Words/WordsAPI';
import { generalState } from '../../states/generalState';
import { OptionalStatistic, Statistic } from '../../types/everydayTypes/statistic';
import { UserWord } from '../../types/everydayTypes/userWord';
import IWordCard from '../../types/interfaces/words';

export default async function learnedWord(wordId: string) {
  const userWord: UserWord = await getUserWordById(
    (generalState.userId as string),
    wordId,
    (generalState.token as string)
  );

  if ((userWord.optional.countTrueAnswerInRow as number) >= 3) {
    const word = await getWord(wordId);


    //   const userStatistic = await getUserStatistic(
    //     (generalState.userId as string),
    //     (generalState.token as string)
    //   );

    //   const statisticWords = userStatistic.optional?.words?.concat(word);

    //   const statistic: Statistic = {
    //     learnedWords: userStatistic.learnedWords + 1,
    //     optional: statisticWords,
    //   };
    // }
  }
