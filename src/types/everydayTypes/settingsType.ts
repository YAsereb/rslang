export type settingsWords = {
  audioWords: string[],
  sprintWords: string[],
  cardWords: string[],
}

export type OptionalSettings = {
  dayToday: Date,
  words: Partial<settingsWords>
}

export type Settings = {
  wordsPerDay: number,
  optional: Partial<OptionalSettings>,
}
