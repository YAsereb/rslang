import renderNavigation from './compomemts/navigation/render-navigation';
import './style.scss';

function renderMain() {
  return `
  <main class="main">
  ${renderNavigation()}
  <section class="about-us">
    <h1>Rslang</h1>
    Написать иформацию о нашем приложении!!!!!
  </section>
</main>`;
}

export default renderMain;
