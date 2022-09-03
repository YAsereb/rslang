// import './navigation.scss';

export default function renderNavigation() {
  return `
  <nav class="navigation" id="navigation">
    <a href="#book" class="navigation-item">Электронный учебник</a>
    <a href="#dictionary" class="navigation-item">Список слов</a>
    <a href="#audio-game" class="navigation-item">Аудиовызов</a>
    <a href="#sprint-game" class="navigation-item">Спринт</a>
    <a href="#statistics" class="navigation-item">Статистика</a>
</nav>
  `;
}
