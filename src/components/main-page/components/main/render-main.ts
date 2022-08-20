import './main.scss';
import dictionaryImg from '../../../../assets/img/dictionary2.png';
import sprintImg from '../../../../assets/img/sprint.png';
import audioImg from '../../../../assets/img/audio-game4.png';
import statisticImg from '../../../../assets/img/statistics1.png';

function renderMain() {
  return `
  <main class="main">
    <article class="article">
      <h2 class="article-header">О нас</h2>
      <p class="article-text">Добро пожаловать в приложения  Rslang, приложение для изучения английского языка в игровой форме</p>
    </article>
    <article class="article">
      <h2 class="article-header">Наши возможности</h2>
      <div  class="wrapper-advantages">
        <div class="advantages-item">
          <p class="advantage-name">Словарь</p>
          <img src="${dictionaryImg}" class="advantages-img" alt="dictionary">
          <p class="advantage-description"></p>
        </div>
        <div class="advantages-item">
          <p class="advantage-name">Игра спринт</p>
          <img src="${sprintImg}" class="advantages-img" alt="sprint-game">
          <p class="advantage-description"></p>
        </div>
        <div class="advantages-item">
          <p class="advantage-name">Игра аудиовызов</p>
          <img src="${audioImg}" class="advantages-img" alt="audio-game">
          <p class="advantage-description"></p>
        </div>
        <div class="advantages-item">
          <p class="advantage-name">Статистика</p>
          <img src="${statisticImg}"class="advantages-img" alt="statistics">
          <p class="advantage-description"></p>
        </div>
      </div>
    </article>
  </main>
  `;
}

export default renderMain;
