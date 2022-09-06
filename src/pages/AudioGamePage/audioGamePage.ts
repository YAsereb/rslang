import renderHeader, {
  handleHeaderListeners,
} from '../../components/main-page/components/header/header';
import renderStartAudioScreen from './components/StartScreenAudio/startScreenAudio';

function renderAudioGamePage() {
  renderHtml();
  renderStartAudioScreen();
  handleSprintPageListeners();
}

function renderHtml() {
  const { body } = document;

  const html = `
                    ${renderHeader()}
                    <main class="main"></main>
      `;

  body.innerHTML = html;
}

function handleSprintPageListeners() {
  handleHeaderListeners();
}

export default renderAudioGamePage;
