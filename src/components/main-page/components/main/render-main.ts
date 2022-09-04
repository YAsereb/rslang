import './main.scss';
import dictionaryImg from '../../../../assets/img/dictionary2.png';
import sprintImg from '../../../../assets/img/sprint.png';
import audioImg from '../../../../assets/img/audio-game4.png';
import statisticImg from '../../../../assets/img/statistics1.png';

function renderMain() {
  return `
  <main class="main">
    <article class="article">
      <div class="home-background-img">
      <p>Добро пожаловать в приложения  Rslang.<br> Наше приложение поможет тебе в игровой форме выучить наиболее распространенные слова английского языка.</p>
      </div>
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
    <article class="article"> <p>Как работает наше приложение</p>
      <div class="content">
<iframe width="700" height="400" src="https://www.youtube.com/embed/SmM0653YvXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>      </article>
    <article class="article">
      <h2 class="article-header">Наша команда</h2>
      <div class="wrapper">
        <div class="developer-card">
          <h3 class="developer-name">Yaroslav Serebrenikov</h3>
          <img src="../../../../../assets/img/proger1.png"class="developer-img" alt="developer_YAsereb">
          <p class="developer-description"><br>Team Lead frontend developer</br></p>
        </div>
        <div class="developer-card">
          <h3 class="developer-name">Usevalad Kunski</h3>
          <img src="../../../../../assets/img/proger2.png"class="developer-img" alt="developer_SEvk4a">
          <p class="developer-description"><br>Team Full stack developer</br></p>
        </div>
        <div class="developer-card">
          <h3 class="developer-name">Yauhen Makarevich</h3>
          <img src="../../../../../assets/img/proger3.png"class="developer-img" alt="developer_zhentosmak">
          <p class="developer-description"><br>Frontend developer</br> </p>
        </div>
      </div>
    </article>
  </main>
  `;
}

export default renderMain;
