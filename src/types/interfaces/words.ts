import { UserWord } from '../everydayTypes/userWord';

export type IUserWord = {
  hard: boolean;
  isDeleted?: boolean;
  isLastTrueAnswer?: boolean;
  countTrueAnswerInRow?: number;
  countTrueAnswer?: number;
  countAttempt?: number;
};

export interface IWordCard {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id?: string;
  _id?: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  userWord: UserWord;
}

export default IWordCard;
