import {
  closeModal,
  handleErrorEmailInput,
  showTextError,
} from '../../components/Authentication';

const url = 'https://react-rs-lang-be.onrender.com';

export async function createUser(user: { email: string; password: string }) {
  const response = await fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.status === 417) {
    showTextError('Email is already in use!');
  } else if (response.status === 422) {
    handleErrorEmailInput();
  } else if (response.status === 200) {
    loginUser(user);
  }
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

  if (response.status === 404 || response.status === 403) {
    showTextError('Invalid Email or Password!');
  } else if (response.status === 200) {
    const userData = await response.json();

    localStorage.setItem('token', JSON.stringify(userData.token));
    localStorage.setItem('userId', JSON.stringify(userData.userId));
    localStorage.setItem('refreshToken', JSON.stringify(userData.refreshToken));
    closeModal();
  }
}
