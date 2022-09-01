export type OptionalWord = {
  isDeleted: boolean,
  isLastTrueAnswer: boolean,
  countTrueAnswerInRow: number,
  countTrueAnswer: number,
  countAttempt: number,
};

export type UserWord = {
  difficulty: 'hard' | 'easy',
  optional: Partial<OptionalWord>
}
