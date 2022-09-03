import { Statistic } from '../../types/everydayTypes/statisticType';

const url = 'http://localhost:8000';

export async function getUserStatistic(userId: string, token: string): Promise<Statistic> {
  const resp = await fetch(`${url}/${userId}/statistic`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  const statistic = await resp.json();
  return statistic;
}

export async function putStatistic(
  id: string,
  token: string,
  statistic: Statistic
): Promise<void> {
  await fetch(`${url}/users/${id}/statistic`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistic),
  });
}
