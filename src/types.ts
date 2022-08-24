export type Word = {
  id: 'string',
  group: number,
  page: number,
  word: 'string',
  image: 'string',
  audio: 'string',
  audioMeaning: 'string',
  audioExample: 'string',
  textMeaning: 'string',
  textExample: 'string',
  transcription: 'string',
  wordTranslate: 'string',
  textMeaningTranslate: 'string',
  textExampleTranslate: 'string'
}

export type Words = Word[];

export type AnswerWord = {
  word: string,
  answer: boolean
}

export type State = {
  page: number,
  group: number,
  trueWordId: string,
  trueWordAudio: string,
  trueWordAudioExample: string,
  imageSrc: string,
  countAnswer: number,
  wordsStatistic: AnswerWord[]
}
