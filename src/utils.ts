export function getUserId(): string {
  const storage = window.localStorage.getItem('userData') as string;
  const storageObject = JSON.parse(storage);
  const { userId } = storageObject;

  return userId;
}

export function getUserToken(): string {
  const storage = window.localStorage.getItem('userData') as string;
  const storageObject = JSON.parse(storage);
  const { token } = storageObject;

  return token;
}

export function getDateToday(): string {
  const today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  return today;
}
