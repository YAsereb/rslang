import dicAndBookVars from '../../pages/DictionaryBookPages';

// eslint-disable-next-line import/prefer-default-export
export const generalState = {
  currentPage: dicAndBookVars.currentPage - 1,
  currentGroup: dicAndBookVars.currentGroup,
  prevPage: window.history.state,
};
