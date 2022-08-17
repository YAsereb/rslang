import './style.scss';
import gitHubIcon from '../../assets/icon/GitHub-ico.png';
import rsschoolIcon from '../../assets/icon/rs_school_js.svg';

export function renderMain() {
  const body = document.body as HTMLBodyElement;
  const html = `<main class="main">
  <nav class="navigation">
    <div class="navigation-item">
      <a href="#" id="electronic-book">Электронный учебник</a>
    </div>
    <div class="navigation-item">
      <a href="#" id="list-of-words">Список слов</a>
    </div>
    <div class="navigation-item">
      <a href="#" id="audio-game">Аудиовызов</a>
    </div>
    <div class="navigation-item">
      <a href="#" id="sprint-game">Спринт</a>
    </div>
    <div class="navigation-item">
      <a href="#" id="progress">Прогресс изучения</a>
    </div>
    <div class="navigation-item">
      <a href="#" id="studied-words">Изученные слова</a>
    </div>
    <div class="navigation-item">
      <a href="#" id="statistics">Статистика</a>
    </div>
    <button id="log-in">Log in</button>
    <button id="sign-up">Sign up</button>
  </nav>
  <section class="about-us">
    <h1>Rslang</h1>
    Написать иформацию о нашем приложении!!!!!
  </section>
</main>`;

  body.innerHTML = html;
}

export function renderFooter() {
  const body = document.body as HTMLBodyElement;
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.innerHTML = `
    <div class="RSschool">
      <a href="https://rs.school/js/">
      <img src="${rsschoolIcon}" alt="School-icon">
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/YAsereb">Serebrenikov Yaroslav
      <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/SEvk4a">
      <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
      </a>
    </div>
    <div class="developer">
      <a href="https://github.com/zhentosmak">
      <img src="${gitHubIcon}" class="gitHub-icon" alt="gitHub-icon">
      </a>
    </div>
  `;
  body.appendChild(footer);
}
