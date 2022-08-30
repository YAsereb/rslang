import dicAndBookVars from '../../pages/DictionaryBookPages';

type GlobalState = {
  currentPage: number,
  currentGroup: number,
  currentURL: string,
  previousURL: string,

}

// eslint-disable-next-line import/prefer-default-export
export const generalState: GlobalState = {
  currentPage: dicAndBookVars.currentPage - 1,
  currentGroup: dicAndBookVars.currentGroup,
  currentURL: '',
  previousURL: '',
};
