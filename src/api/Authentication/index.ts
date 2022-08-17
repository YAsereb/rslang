const url = 'http://localhost:8000';

export async function createUser(user: { email: string; password: string }) {
  await fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export async function loginUser(user: { email: string; password: string }) {
  const response = await fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const userInfo = await response.json();

  console.log(userInfo);
}
