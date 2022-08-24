const url = 'http://localhost:8000';

export default async function getAllWords(numGroup: string, page: number) {
  const response = await fetch(
    `${url}/words?group=${numGroup}&page=${page - 1}`
  );

  const data = await response.json();

  return data;
}
