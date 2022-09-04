import IWordCard from '../interfaces/words';

export type GlobalState = {
  currentPage: number;
  currentGroup: number;
  currentURL: string;
  previousURL: string;
  token: string | null;
  refreshToken: string | null;
  userId: string | null;
  currentData: IWordCard[];
};
