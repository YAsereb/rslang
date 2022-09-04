import { handleRouter } from '../../../../router';
import { generalState } from '../../../../states/generalState';
import './header.scss';

export const headerState = {
  isLogin: false,
};

function renderHeader() {
  checkSsLogin();

  return `
    <header class="header">
    <div class="centered-container">
      <div class="header-container">
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
        </div>
      </div>
    </header>
 `;
}

export function handleHeaderListeners() {
  const logoutBtn = document.getElementById('sign-up') as HTMLElement;

  logoutBtn.addEventListener('click', handleAuth);
}

function handleAuth(event: Event) {
  const currentTarget = event.currentTarget as HTMLElement;

  if (currentTarget.textContent === 'LOGOUT') {
    handleLogOut();
  } else if (currentTarget.textContent === 'LOGIN') {
    window.location.href = '#auth';
  }
}

export function handleLogOut() {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  headerState.isLogin = false;
  generalState.userId = '';
  generalState.token = '';
  generalState.refreshToken = '';
  generalState.currentData = [];

  handleRouter();
}

function checkSsLogin() {
  const userId = localStorage.getItem('userId') as string;

  if (userId) {
    const token = localStorage.getItem('token') as string;
    const refreshToken = localStorage.getItem('refreshToken') as string;

    headerState.isLogin = true;
    generalState.token = JSON.parse(token);
    generalState.userId = JSON.parse(userId);
    generalState.refreshToken = JSON.parse(refreshToken);
  }
}

export default renderHeader;
