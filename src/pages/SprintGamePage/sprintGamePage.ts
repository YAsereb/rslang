import renderHeader, {
  handleHeaderListeners,
} from '../../components/main-page/components/header/header';
import renderStartSprintScreen from './components/StartScreenSprint/startScreenSprint';

function renderSprintGamePage() {
  renderHtml();
  renderStartSprintScreen();
  handleSprintPageListeners();
}

function renderHtml() {
  const { body } = document;

  const html = `
                  ${renderHeader()}
                  <main></main>
    `;

  body.innerHTML = html;
}

function handleSprintPageListeners() {
  handleHeaderListeners();
}

export default renderSprintGamePage;
