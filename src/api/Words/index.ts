const url = 'http://localhost:8000';

export default async function getAllWords() {
  const response = await fetch(`${url}/words`);

  const data = await response.json();

  return data;
}
