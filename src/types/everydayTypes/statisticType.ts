import IWordCard from '../interfaces/words';

export type OptionalStatistic = {
  words: IWordCard[]
}

export type Statistic = {
  learnedWords: number,
  optional: Partial<OptionalStatistic>,
}
