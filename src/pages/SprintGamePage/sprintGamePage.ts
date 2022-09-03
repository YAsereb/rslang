import renderHeader from '../../components/main-page/components/header/header';
import renderStartSprintScreen from './components/StartScreenSprint/startScreenSprint';

function renderSprintGamePage() {
  renderHtml();
  renderStartSprintScreen();
}

function renderHtml() {
  const { body } = document;

  const html = `
                  ${renderHeader()}
                  <main></main>
    `;

  body.innerHTML = html;
}

export default renderSprintGamePage;
