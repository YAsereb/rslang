import { createUser, loginUser } from '../../api/Authentication';
import './style.css';

function handlePasswordValidate() {
  const password = document.getElementById(
    'password-input'
  ) as HTMLInputElement;

  if (password.value.length === 0) {
    password.placeholder = 'must not be empty';
    password.classList.add('error-input');
  } else if (password.value.length < 8) {
    password.value = '';
    password.placeholder = 'must be more than 7 characters';
    password.classList.add('error-input');
  }
}

function handleEmailValidate() {
  const email = document.getElementById('email-input') as HTMLInputElement;

  if (email.value.length === 0) {
    email.placeholder = 'must not be empty';
    email.classList.add('error-input');
  } else if (!email.validity.valid) {
    email.value = '';
    email.placeholder = 'incorrect email';
    email.classList.add('error-input');
  }
}

function handleValidate() {
  handlePasswordValidate();
  handleEmailValidate();
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

function changeAuthentication(e: Event) {
  const target = e.target as HTMLElement;
  const title = document.getElementById('authentication-title') as HTMLElement;
  const btn = document.getElementById('authentication-btn') as HTMLElement;
  const text = document.getElementById('authentication-text') as HTMLElement;

  if (target.textContent === 'Sign up') {
    title.textContent = 'Sign Up';
    btn.textContent = 'SIGN UP';
    text.textContent = 'Already have an account?';
    target.textContent = 'Sign in';
  } else {
    title.textContent = 'Sign In';
    btn.textContent = 'SIGN IN';
    text.textContent = "Don't have an account?";
    target.textContent = 'Sign up';
  }
}

function deleteInputError(defaultPlaceholder: string, id: string) {
  const element = document.getElementById(`${id}-input`) as HTMLInputElement;

  if (element.classList.contains('error-input')) {
    element.classList.remove('error-input');
    element.placeholder = defaultPlaceholder;
  }
}

function renderAuthentication() {
  const body = document.querySelector('body') as HTMLElement;

  const block = document.createElement('div');

  block.classList.add('authentication-block');

  block.innerHTML = `
                    <h3 id="authentication-title">Sign In</h3>
                    <form class="authentication-form" id="authentication-form">
                        <input type="email" value="" placeholder="E-mail" id="email-input" />
                        <input type="password" value="" placeholder="Password" id="password-input" />
                        <button id="authentication-btn">SIGN IN</button>
                    </form>
                    <div class="authentication-text">
                      <p id="authentication-text">Don't have an account?</p><span id="change-authentication">Sign up</span>
                    </div>
                    `;

  body.append(block);

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

export default renderAuthentication;
