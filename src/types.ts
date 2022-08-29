export type Word = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

export type Words = Word[];

export type AnswerWord = {
  trueWord: string,
  trueWordAudio: string,
  wordTranslate: string
}

export type State = {
  prevPage: string,
  page: number,
  group: number,
  trueWordId: string,
  trueWord: string,
  trueWordAudio: string,
  trueWordAudioExample: string,
  imageSrc: string,
  countAnswer: number,
  wordTranslate: string,
  trueAnswers: AnswerWord[]
  falseAnswers: AnswerWord[]
  isButtonActive: boolean
}
