export type PlaceLearnedWord = 'audio-game' | 'sprint-game' | 'book'

export type OptionalWord = {
  isNew: boolean,
  whenSetNew: string,
  isLastTrueAnswer: boolean,
  countTrueAnswerInRow: number,
  countTrueAnswer: number,
  countAttempt: number,
  isLearned: boolean,
  whenLearnedDate: string,
  whereLearned: PlaceLearnedWord
};

export type UserWord = {
  difficulty: 'hard' | 'easy',
  optional: OptionalWord
}
