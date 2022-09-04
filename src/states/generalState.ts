import dicAndBookVars from '../pages/DictionaryBookPages';
import { GlobalState } from '../types/everydayTypes/GlobalState';

// eslint-disable-next-line import/prefer-default-export
export const generalState: GlobalState = {
  currentPage: dicAndBookVars.currentPage - 1,
  currentGroup: dicAndBookVars.currentGroup,
  currentURL: '',
  previousURL: '',
  token: '',
  refreshToken: '',
  userId: '',
  currentData: [],
};
