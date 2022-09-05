import renderFooter from '../main-page/components/footer/footer';
import renderHeader from '../main-page/components/header/header';
import handleSettingsWord from './settings';
import './statistic.scss';

async function renderStatisticMiniGames(): Promise<string> {
  const todayNewWords = await handleSettingsWord();
  const audioWords = todayNewWords.filter((word) => (word.optional.whereLearned === 'audio-game'));

  let countAudioAttempt = 0;
  let countRightAudioAnswer = 0;
  const arrayAudioRightAnswerInRow: number[] = [];
  if (audioWords.length) {
    audioWords.forEach((el) => {
      countAudioAttempt += el.optional.countAttempt as number;
      countRightAudioAnswer += el.optional.countTrueAnswer as number;
      arrayAudioRightAnswerInRow.push(el.optional.countTrueAnswerInRow as number);
    });
  }
  const percentageAudio = countRightAudioAnswer / countAudioAttempt;
  const maxAudioRightAnswerInRow = Math.max(...arrayAudioRightAnswerInRow);

  const sprintWords = todayNewWords.filter((word) => (word.optional.whereLearned === 'sprint-game'));
  let countSprintAttempt = 0;
  let countRightSprintAnswer = 0;
  const arraySprintRightAnswerInRow: number[] = [];
  if (audioWords.length) {
    audioWords.forEach((el) => {
      countSprintAttempt += el.optional.countAttempt as number;
      countRightSprintAnswer += el.optional.countTrueAnswer as number;
      arraySprintRightAnswerInRow.push(el.optional.countTrueAnswerInRow as number);
    });
  }
  const percentageSprint = countRightSprintAnswer / countSprintAttempt;
  const maxSprintRightAnswerInRow = Math.max(...arraySprintRightAnswerInRow);

  const cardWords = todayNewWords.filter((word) => (word.optional.whereLearned === 'book'));
  return `
  <div class="statistic-item">
    <h3 class="statistic-item__header">Mini-game statistics</h3>
    <div class="game-statistic-wrapper">
      <div class="statistic-item__game">Sprint:
        <p>Count new word today: ${sprintWords.length}</p>
        <p>Percentage right answer: ${percentageSprint}</p>
        <p>Longest series of correct answers: ${maxSprintRightAnswerInRow}</p>
      </div>
      <div class="statistic-item__game">Audio call:
        <p>Count new word today: ${audioWords.length}</p>
        <p>Percentage right answer: ${percentageAudio}</p>
        <p>Longest series of correct answers: ${maxAudioRightAnswerInRow}</p>
      </div>
    </div>
  </div>
  <div class="statistic-item">
    <h3 class="statistic-item__header">Word statistic</h3>
    <p>Count new word today: ${todayNewWords.length}</p>
    <p>Percentage right answer</p>
    <p>Longest series of correct answers</p>
  </div>
`;
}

export default async function renderStatistic(): Promise<void> {
  const { body } = document;

  body.innerHTML = `
    ${renderHeader()}
    <main class="main">
      <div class="statistic">
        ${await renderStatisticMiniGames()}
      </div>
    </main>

    ${renderFooter()}
  `;
}
