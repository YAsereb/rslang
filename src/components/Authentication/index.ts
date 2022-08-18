import { createUser, loginUser } from '../../api/Authentication';
import './style.scss';

const authVariables = {
  isSignUp: true,
};

function renderAuthentication() {
  const body = document.querySelector('body') as HTMLElement;

  body.innerHTML = '';

  const block = document.createElement('div');

  block.classList.add('authentication-block');

  block.innerHTML = `
                    <h3 id="authentication-title">${
                      authVariables.isSignUp ? 'Sign In' : 'Sign Up'
                    }</h3>
                    <form class="authentication-form" id="authentication-form">
                        <input type="email" value="" placeholder="E-mail" id="email-input" />
                        <input type="password" value="" placeholder="Password" id="password-input" />
                        <button id="authentication-btn">${
                          authVariables.isSignUp ? 'SIGN IN' : 'SIGN UP'
                        }</button>
                    </form>
                    <div class="authentication-text">
                      <p id="authentication-text">${
                        authVariables.isSignUp
                          ? 'Dont have an account?'
                          : 'Already have an account?'
                      }</p><span id="change-authentication">${
    authVariables.isSignUp ? 'Sign up' : 'Sign in'
  }</span>
                    </div>
                    `;

  body.append(block);

  handleListeners();
}

function handleListeners() {
  const authenticationBtn = document.getElementById('authentication-btn');
  const changeAuthBtn = document.getElementById('change-authentication');
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');

  authenticationBtn?.addEventListener('click', handleForm);
  changeAuthBtn?.addEventListener('click', changeAuthentication);
  emailInput?.addEventListener('input', () => {
    deleteInputError('E-mail', 'email');
  });
  passwordInput?.addEventListener('input', () => {
    deleteInputError('Password', 'password');
  });
}

function changeAuthentication(e: Event) {
  const target = e.target as HTMLElement;

  if (target.textContent === 'Sign up') {
    authVariables.isSignUp = false;
  } else {
    authVariables.isSignUp = true;
  }

  renderAuthentication();
}

function handleForm(e: Event) {
  e.preventDefault();

  const target = e.target as HTMLElement;

  const email = document.getElementById('email-input') as HTMLInputElement;
  const password = document.getElementById(
    'password-input'
  ) as HTMLInputElement;

  const user = {
    email: email.value,
    password: password.value,
  };

  if (target.textContent === 'SIGN UP') {
    handleValidate();

    createUser(user);
  } else {
    handleValidate();

    loginUser(user);
  }
}

function handleValidate() {
  handlePasswordValidate();
  handleEmailValidate();
}

function handlePasswordValidate() {
  const password = document.getElementById(
    'password-input'
  ) as HTMLInputElement;

  if (password.value.length < 8) {
    password.value = '';
    password.placeholder = 'Password is too short - should be 8 chars minimum.';
    password.classList.add('error-input');
  }
}

function handleEmailValidate() {
  const email = document.getElementById('email-input') as HTMLInputElement;

  if (email.value.length === 0) {
    email.placeholder = 'Email is required field';
    email.classList.add('error-input');
  } else if (!email.validity.valid) {
    email.value = '';
    email.placeholder = 'Email should have correct format';
    email.classList.add('error-input');
  }
}

function deleteInputError(defaultPlaceholder: string, id: string) {
  const element = document.getElementById(`${id}-input`) as HTMLInputElement;

  if (element.classList.contains('error-input')) {
    element.classList.remove('error-input');
    element.placeholder = defaultPlaceholder;
  }
}

export default renderAuthentication;
