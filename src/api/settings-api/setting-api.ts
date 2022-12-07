import { Settings } from '../../types/everydayTypes/settingsType';

const url = 'https://react-rs-lang-be.onrender.com';

export async function getUserSettings(
  userId: string,
  token: string,
): Promise<Settings | null> {
  const resp = await fetch(`${url}/users/${userId}/settings`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (resp.status === 404) return null;

  const setting = await resp.json();
  return setting;
}

export async function updateUserSettings(
  userId: string,
  token: string,
  userSettings: Settings
): Promise<Settings> {
  const resp = await fetch(`${url}/users/${userId}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userSettings),
  });
  const settings = resp.json();
  return settings;
}
