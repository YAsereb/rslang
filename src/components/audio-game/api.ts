import { Words, Word } from '../../types';

const baseLink = 'https://rs-langtask.herokuapp.com';

export async function getWord(id: string): Promise<Word> {
  const word: Word = await (await fetch(`${baseLink}/word/${id}`)).json();
  return word;
}

export async function getWords(group: number, page: number): Promise<Words> {
  const words = await (
    await fetch(`${baseLink}/words?group=${group}&page=${page}`)
  ).json();
  return words;
}
