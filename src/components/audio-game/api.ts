import { Words, Word } from '../../types';

const baseLink = 'http://localhost:8000';

export async function getWord(id: string): Promise<Word> {
  const word: Word = await (await fetch(`${baseLink}/word/${id}`)).json();
  return word;
}

export async function getWords(page = 0, group = 0): Promise<Words> {
  const words = await (await fetch(`${baseLink}/words?group=${group}&page=${page}`)).json();
  return words;
}
