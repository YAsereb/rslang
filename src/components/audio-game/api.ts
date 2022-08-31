import { Words, Word } from '../../types';

const baseLink = 'http://localhost:8000';
// const aggregatedWords = '/aggregatedWords';
// const { userId } = window.localStorage;

export async function getWord(id: string): Promise<Word> {
  const word: Word = await (await (await fetch(`${baseLink}/word/${id}`)).json());
  return word;
}

export async function getWords(page = 0, group = 0): Promise<Words> {
  const words = await (await fetch(`${baseLink}/words?page=${page}&group=${group}`)).json();
  return words;
}

export async function getUserWords(userId: string) {
  const words = await (await fetch(`${baseLink}/users/${userId}`)).json();
  return words;
}

export async function getUserWordById(userId: string, wordId: string) {
  const word = (await (await fetch(`${baseLink}/users/${userId}/words/${wordId}`)).json());
  return word;
}

// eslint-disable-next-line max-len
// export async function aggregatedWords(userId: string, _gruop?: string, _page?: string, _wordsPerPage?: string, _filter?: string) {
//   const words = await (await fetch(`${baseLink}/users/${userId}/aggregatedWords`)).json();
//   return words;
// }
