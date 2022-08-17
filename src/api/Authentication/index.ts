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
  const resposne = await fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (resposne.status === 404) {
    console.log(123);
  }

  console.log(resposne);
}
