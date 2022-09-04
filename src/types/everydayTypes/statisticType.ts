export type OptionalStatistic = {
  audioWords: string[]
  sprintWords: string[]
  cardWords: string[]
}

export type Statistic = {
  learnedWords: number,
  optional: Partial<OptionalStatistic>,
}
