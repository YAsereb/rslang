import { createUser, loginUser } from '../../api/Authentication';
import './style.scss';

const authVariables = {
  isSignUp: true,
  isValidate: true,
  authBtn: '' as string | HTMLButtonElement,
  emailInput: '' as string | HTMLInputElement,
  passwordInput: '' as string | HTMLInputElement,
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
  authVariables.authBtn = document.getElementById(
    'authentication-btn'
  ) as HTMLButtonElement;
  const changeAuthBtn = document.getElementById(
    'change-authentication'
  ) as HTMLButtonElement;
  authVariables.emailInput = document.getElementById(
    'email-input'
  ) as HTMLInputElement;
  authVariables.passwordInput = document.getElementById(
    'password-input'
  ) as HTMLInputElement;

  authVariables.authBtn.addEventListener('click', handleForm);
  changeAuthBtn.addEventListener('click', changeAuthentication);
  authVariables.emailInput.addEventListener('input', () => {
    deleteErrors('E-mail', 'email');
  });
  authVariables.passwordInput.addEventListener('input', () => {
    deleteErrors('Password', 'password');
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

  handleValidate();

  if (authVariables.isValidate) {
    const user = {
      email: (authVariables.emailInput as HTMLInputElement).value,
      password: (authVariables.passwordInput as HTMLInputElement).value,
    };

    if (
      (authVariables.authBtn as HTMLButtonElement).textContent === 'SIGN UP'
    ) {
      createUser(user);
    } else {
      loginUser(user);
    }
  } else {
    (authVariables.authBtn as HTMLButtonElement).disabled = true;
  }
}

function handleValidate() {
  handlePasswordValidate();
  handleEmailValidate();
}

function handlePasswordValidate() {
  if ((authVariables.passwordInput as HTMLInputElement).value.length < 8) {
    (authVariables.passwordInput as HTMLInputElement).value = '';
    (authVariables.passwordInput as HTMLInputElement).placeholder =
      'Password is too short - should be 8 chars minimum!';
    (authVariables.passwordInput as HTMLInputElement).classList.add(
      'auth-error__input'
    );
    authVariables.isValidate = false;
  }
}

function handleEmailValidate() {
  if ((authVariables.emailInput as HTMLInputElement).value.length === 0) {
    (authVariables.emailInput as HTMLInputElement).placeholder =
      'Email is required field!';
    (authVariables.emailInput as HTMLInputElement).classList.add(
      'auth-error__input'
    );
    authVariables.isValidate = false;
  } else if (!(authVariables.emailInput as HTMLInputElement).validity.valid) {
    handleErrorEmailInput();
  }
}

export function handleErrorEmailInput() {
  (authVariables.emailInput as HTMLInputElement).value = '';
  (authVariables.emailInput as HTMLInputElement).placeholder =
    'Email should have correct format!';
  (authVariables.emailInput as HTMLInputElement).classList.add(
    'auth-error__input'
  );
  authVariables.isValidate = false;
}

function deleteErrors(defaultPlaceholder: string, id: string) {
  const inputElement = document.getElementById(
    `${id}-input`
  ) as HTMLInputElement;
  const textElement = document.querySelector('.auth-error__title');

  if (inputElement.classList.contains('auth-error__input')) {
    inputElement.classList.remove('auth-error__input');
    inputElement.placeholder = defaultPlaceholder;
    handleActivateBtn();
  } else if (textElement) {
    (authVariables.authBtn as HTMLButtonElement).disabled = false;
    textElement.remove();
  }
}

function handleActivateBtn() {
  if (
    !(authVariables.emailInput as HTMLInputElement).classList.contains(
      'auth-error__input'
    ) &&
    !(authVariables.passwordInput as HTMLInputElement).classList.contains(
      'auth-error__input'
    )
  ) {
    (authVariables.authBtn as HTMLButtonElement).disabled = false;
    authVariables.isValidate = true;
  }
}

export function showTextError(textError: string) {
  const titleAuth = document.getElementById(
    'authentication-title'
  ) as HTMLElement;

  const elementError = document.querySelector('.auth-error__title');

  if (!elementError) {
    const element = document.createElement('p');

    element.textContent = textError;
    element.classList.add('auth-error__title');

    titleAuth.insertAdjacentElement('afterend', element);
    (authVariables.authBtn as HTMLButtonElement).disabled = true;
  }
}

export default renderAuthentication;
