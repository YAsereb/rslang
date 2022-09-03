import IWordCard from '../interfaces/words';

export type OptionalSettings = {
  words: IWordCard[]
}

export type Settings = {
  wordsPerDay: number,
  optional: Partial<OptionalSettings>,
}
