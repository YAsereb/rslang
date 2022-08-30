import { handleRouter } from '../../../../router';
import './header.scss';

export const headerState = {
  isLogin: false,
};

function renderHeader() {
  checkSsLogin();

  return `
    <header class="header">
      <div class="header-home">
        <a href="#" class="home-button">
          <svg>
            <use xlink:href="./assets/svg/sprite/header.svg#home"></use>
          </svg>
        </a>
      </div>
      <nav class="navigation" id="navigation">
        <div class="navigation-list">
          ${headerState.isLogin ? '<a href="#dictionary">Dictionary</a>' : ''}
          <a href="#book">Textbook</a>
          <div class="navigation-games">
          <div class="games-item">
            <span>Games</span>
            <svg>
              <use xlink:href="./assets/svg/sprite/header.svg#arrow"></use>
            </svg>
          </div>
            <ul class="games-list">
              <a href="#audiocall"><li>AudioCall</li></a>
              <a href="#sprint"><li>Sprint</li></a>
            </ul>
          </div>
          <a href="#statistics">Statistics</a>
        </div>
        <div class="navigation-auth">
          <a id="sign-up">${headerState.isLogin ? 'LOGOUT' : 'LOGIN'}</a>
        </div>
      </nav>
    </header>
 `;
}

export function handleHeaderListeners() {
  const logoutBtn = document.getElementById('sign-up');

  logoutBtn?.addEventListener('click', handleAuth);
}

function handleAuth(event: Event) {
  const currentTarget = event.currentTarget as HTMLElement;

  if (currentTarget.textContent === 'LOGOUT') {
    localStorage.removeItem('userData');
    headerState.isLogin = false;
    handleRouter();
  } else if (currentTarget.textContent === 'LOGIN') {
    window.location.href = '#auth';
  }
}

function checkSsLogin() {
  const user = localStorage.getItem('userData');

  if (user) {
    headerState.isLogin = true;
  }
}

export default renderHeader;
