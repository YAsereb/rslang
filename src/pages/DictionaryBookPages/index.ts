const dicAndBookVars = {
  isBookPage: true,
  currentGroup: 0,
  currentPage: Number(localStorage.getItem('page')) || 1,
  prevPage: 1,
  bookLimit: 20,
  dictionaryLimit: 600,
};

export default dicAndBookVars;
