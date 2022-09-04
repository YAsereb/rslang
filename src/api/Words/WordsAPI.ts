import { generalState } from '../../states/generalState';
import { UserWord } from '../../types/everydayTypes/userWord';
import IWordCard from '../../types/interfaces/words';

const url = 'http://localhost:8000';

export default async function getAllWords(numGroup: number, page: number) {
  const response = await fetch(
    `${url}/words?group=${numGroup}&page=${page - 1}`
  );

  const data = await response.json();

  return data;
}

export async function getWord(wordId: string) {
  const response = await fetch(`${url}/words/${wordId}`);

  const data = await response.json();

  return data;
}

export async function getAllUserWords(
  id: string,
  token: string
): Promise<UserWord[]> {
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

export async function getUserWordById(
  id: string,
  wordId: string,
  token: string
): Promise<UserWord | null> {
  console.log(3);

  const resp = await fetch(`${url}/users/${id}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (resp.status === 404) return null;
  const word = await resp.json();
  return word;
}

export async function postFilterUserWord(
  id: string,
  token: string,
  wordId: string,
  optional: UserWord
): Promise<void> {
  const response = await fetch(`${url}/users/${id}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(optional),
  });

  if (response.status === 417) {
    putFilterUserWord(id, token, wordId, optional);
  }
}

export async function putFilterUserWord(
  id: string,
  token: string,
  wordId: string,
  optional: UserWord
): Promise<void> {
  await fetch(`${url}/users/${id}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(optional),
  });
}

export async function deleteFilterUserWord(
  id: string,
  token: string,
  wordId: string
): Promise<void> {
  await fetch(`${url}/users/${id}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
}

export async function getAggregatedWords(
  id: string,
  token: string,
  limit: number,
  filter: string
): Promise<IWordCard[]> {
  let data: IWordCard[] = [];
  try {
    const response = await fetch(
      `${url}/users/${id}/aggregatedWords?filter=${filter}&wordsPerPage=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    const paginatedResult = await response.json();

    data = paginatedResult[0].paginatedResults;

    return data;
  } catch (err) {
    await updateToken();

    data = await getAggregatedWords(
      id,
      generalState.token as string,
      limit,
      filter
    );

    return data;
  }
}

async function updateToken() {
  const response = await fetch(`${url}/users/${generalState.userId}/tokens`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${generalState.refreshToken}`,
      Accept: 'application/json',
    },
  });

  const data = await response.json();

  localStorage.setItem('token', JSON.stringify(data.token));
  localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
  generalState.token = data.token;
  generalState.refreshToken = data.refreshToken;
}
