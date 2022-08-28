const url = 'http://localhost:8000';
export const filterState = {
  typeFilter: {},
  filter: {},
};

export default async function getAllWords(numGroup: number, page: number) {
  const response = await fetch(
    `${url}/words?group=${numGroup}&page=${page - 1}`
  );

  const data = await response.json();

  return data;
}

export async function getWord(id: string) {
  const response = await fetch(`${url}/words/${id}`);

  const data = await response.json();

  return data;
}

export async function getAllUserWords(id: number, token: number) {
  const response = await fetch(`${url}/users/${id}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const data = await response.json();

  return data;
}

export async function postFilterUserWord(
  id: string,
  token: string,
  wordId: string
) {
  await fetch(`${url}/users/${id}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filterState.filter),
  });
}

export async function putFilterUserWord(
  id: string,
  token: string,
  wordId: string
) {
  await fetch(`${url}/users/${id}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
}

export async function getAggregatedWords(id: number, token: number) {
  const response = await fetch(
    `${url}/users/${id}/aggregatedWords?filter=${filterState.typeFilter}&wordsPerPage=20`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );

  const data = await response.json();

  const arr = data[0].paginatedResults;

  return arr;
}
