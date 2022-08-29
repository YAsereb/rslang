interface IWordCard {
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
  userWord: { optional: IUserWord };
}

type IUserWord = {
  hard: boolean;
  isDeleted: boolean;
};

export default IWordCard;
