import getAllWords from '../../../../api/Words/WordsAPI';
import IWordCard from '../../../../types/interfaces/words';
import renderSprintWindowGame from '../SprintWindowGame/sprintWindowGame';
import './style.scss';

export const sprintState = {
  data: [] as IWordCard[],
  cuurentGroup: 0,
};

function renderStartSprintScreen() {
  const main = document.querySelector('main') as HTMLElement;

  const html = `
                <div class="start-screen">
                    <div class="start-screen__header">
                        <p class="start-screen__title">Sprint</p>
                        <p class="start-screen__text">Sprint is a speed training. Try to guess as many words as possible in 60 seconds.</p>
                    </div>
                    <div class="start-screen__main">
                        <div class="start-screen-levels__title">Сhoose a level:</div>
                        <ul class="start-screen-levels__list">
                            <li data-group="0">A1</li>
                            <li data-group="1">A2</li>
                            <li data-group="2">B1</li>
                            <li data-group="3">B2</li>
                            <li data-group="4">C1</li>
                            <li data-group="5">C2</li>
                        </ul>
                        <button class="start-screen__btn" disabled>Start</button>
                    </div>
                </div>

  `;

  main.insertAdjacentHTML('beforeend', html);
  handleStartSprintScreenListeners();
}

function handleStartSprintScreenListeners() {
  const startBtn = document.querySelector('.start-screen__btn');
  const levelsList = document.querySelector('.start-screen-levels__list');

  startBtn?.addEventListener('click', renderSprintWindowGame);
  levelsList?.addEventListener('click', handleLevel);
}

async function handleLevel(event: Event) {
  const target = event.target as HTMLElement;

  if (target.nodeName === 'LI') {
    sprintState.cuurentGroup = Number(target.getAttribute('data-group'));
    const page = getRandomPage();
    const startBtn = document.querySelector(
      '.start-screen__btn'
    ) as HTMLButtonElement;

    startBtn.disabled = false;

    sprintState.data = await getAllWords(sprintState.cuurentGroup, page);
  }
}

export function getRandomPage() {
  return Math.ceil(Math.random() * 30);
}

export default renderStartSprintScreen;
