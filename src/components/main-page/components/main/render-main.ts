import './main.scss';
import dictionaryImg from '../../../../assets/img/dictionary2.png';
import sprintImg from '../../../../assets/img/sprint.png';
import audioImg from '../../../../assets/img/audio-game4.png';
import statisticImg from '../../../../assets/img/statistics1.png';

function renderMain() {
  return `
  <main class="main">
    <article class="article">
      <p>Добро пожаловать в приложения  Rslang - приложение для изучения английского языка в игровой форме.</p>
      <h2 class="article-header">Наши возможности</h2>
      <div  class="wrapper">
        <div class="advantages-item">
          <p class="advantage-name">Словарь</p>
          <img src="${dictionaryImg}" class="advantages-img" alt="dictionary">
          <p class="advantage-description">Место, где ты можешь изучать новые слова, добавлять их в список для изучения</p>
        </div>
        <div class="advantages-item">
          <p class="advantage-name">Игра спринт</p>
          <img src="${sprintImg}" class="advantages-img" alt="sprint-game">
          <p class="advantage-description">Мини-игра, в который ты можешь испытать свои знания на время</p>
        </div>
        <div class="advantages-item">
          <p class="advantage-name">Игра аудиовызов</p>
          <img src="${audioImg}" class="advantages-img" alt="audio-game">
          <p class="advantage-description">Мини-игра, в которой ты тренируешь свои аудио навыки</p>
        </div>
        <div class="advantages-item">
          <p class="advantage-name">Статистика</p>
          <img src="${statisticImg}"class="advantages-img" alt="statistics">
          <p class="advantage-description">Здесь ты можешь увидеть свою статистику</p>
        </div>
      </div>
    </article>
    <article class="article">
      <h2 class="article-header">Наша команда</h2>
      <div class="wrapper">
        <div class="developer-card">
          <h3 class="developer-name">Yasereb</h3>
          <img class="developer-img">
        </div>
        <div class="developer-card">
          <h3 class="developer-name">SEvk4a</h3>
          <img class="developer-img">
        </div>
        <div class="developer-card">
          <h3 class="developer-name">zhentosmak</h3>
          <img class="developer-img">
        </div>
      </div>
    </article>
  </main>
  `;
}

export default renderMain;
