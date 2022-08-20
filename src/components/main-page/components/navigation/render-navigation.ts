import './navigation.scss';

export default function renderNavigation() {
  return `
  <nav class="navigation" id="navigation">
    <a href="#electronic-book" class="navigation-item">Электронный учебник</a>
    <a href="#list-of-words" class="navigation-item">Список слов</a>
    <a href="#audio-game" class="navigation-item">Аудиовызов</a>
    <a href="#sprint-game" class="navigation-item">Спринт</a>
    <a href="#progress" class="navigation-item">Прогресс изучения</a>
    <a href="#studied-words" class="navigation-item">Изученные слова</a>
    <a href="#statistics" class="navigation-item">Статистика</a>
</nav>
  `;
}
