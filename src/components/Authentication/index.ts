import { createUser, loginUser } from '../../api/Authentication';
import { IAuthVariables } from '../../types/everydayTypes/authentication';
import './style.scss';

const authVariables: IAuthVariables = {
  isSignUp: true,
  isValidate: true,
  authBtn: '',
  emailInput: '',
  passwordInput: '',
};

function renderAuthPage() {
  renderAuth();
}

function renderAuth() {
  const { body } = document;

  body.innerHTML = '';

  const wrapper = document.createElement('div');

  wrapper.classList.add('authentication-wrapper');

  wrapper.innerHTML = `
                    
                    <div class="authentication-block">
                      <button class="close-btn">
                        <svg>
                          <use xlink:href="./assets/svg/sprite/wordCard.svg#delete"></use>
                        </svg>
                      </button>
                      <h3 id="authentication-title">${
                        authVariables.isSignUp ? 'LOG IN' : 'SIGN UP'
                      }</h3>
                      <form class="authentication-form" id="authentication-form">
                          <label>Email</label>
                          <input type="email" value="" placeholder="Write something" id="email-input" />
                          <label>Password</label>
                          <input type="password" value="" placeholder="Write something" id="password-input" />
                          <button id="authentication-btn">${
                            authVariables.isSignUp ? 'LOG IN' : 'SIGN UP'
                          }</button>
                      </form>
                      <div class="authentication-text">
                        <p id="authentication-text">${
                          authVariables.isSignUp
                            ? 'Dont have an account?'
                            : 'Already have an account?'
                        }</p><span id="change-authentication">${
    authVariables.isSignUp ? 'Sign up' : 'Log in'
  }</span>
                      </div>
                    </div>
                    `;

  body.append(wrapper);

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
  const closeBtn = document.querySelector('.close-btn');

  authVariables.authBtn.addEventListener('click', handleForm);
  changeAuthBtn.addEventListener('click', toggleAuthentication);
  authVariables.emailInput.addEventListener('input', () => {
    deleteErrors('E-mail', 'email');
  });
  authVariables.passwordInput.addEventListener('input', () => {
    deleteErrors('Password', 'password');
  });

  closeBtn?.addEventListener('click', closeModal);
}

function toggleAuthentication(e: Event) {
  const target = e.target as HTMLElement;

  if (target.textContent === 'Sign up') {
    authVariables.isSignUp = false;
  } else {
    authVariables.isSignUp = true;
  }

  renderAuth();
}

function handleForm(e: Event) {
  e.preventDefault();

  console.log(1);

  handleValidate();

  if (authVariables.isValidate) {
    const user = {
      email: (authVariables.emailInput as HTMLInputElement).value,
      password: (authVariables.passwordInput as HTMLInputElement).value,
    };

    if (
      (authVariables.authBtn as HTMLButtonElement).textContent === 'SIGN UP'
    ) {
      console.log(1);

      createUser(user);
    } else {
      loginUser(user);
    }
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
    (authVariables.authBtn as HTMLButtonElement).disabled = true;
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
    (authVariables.authBtn as HTMLButtonElement).disabled = true;
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
  (authVariables.authBtn as HTMLButtonElement).disabled = true;
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

export function closeModal() {
  const prevHash = window.history;

  prevHash.back();
}

export default renderAuthPage;
