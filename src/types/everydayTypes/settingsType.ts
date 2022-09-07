type OptionalSettingsGame = {
  countGame: number,
  percentageRightAnswer: number,
  maxRightAnswerInRow: number,
}

export type OptionalSettings = {
  dayToday: string,
  audioGame: OptionalSettingsGame,
  sprintGame: OptionalSettingsGame,
}

export type Settings = {
  wordsPerDay: number,
  optional: OptionalSettings,
}
