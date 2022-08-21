import { Words } from '../../types';

const baseLink = 'http://localhost:8000';

export default async function getWords(page = 0, group = 0): Promise<Words> {
  const words = await (await fetch(`${baseLink}/words?page=${page}&group=${group}`)).json();
  return words;
}
