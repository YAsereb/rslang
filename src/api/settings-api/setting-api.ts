import { Settings } from '../../types/everydayTypes/settingsType';

const url = 'https://rs-langtask.herokuapp.com';

export async function getUserSettings(
  userId: string,
  token: string
): Promise<Settings> {
  const resp = await fetch(`${url}/users/${userId}/settings`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const settings = await resp.json();
  return settings;
}

export async function updateUserSettings(
  userId: string,
  token: string,
  settings: Settings
): Promise<void> {
  await fetch(`${url}/users/${userId}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });
}
