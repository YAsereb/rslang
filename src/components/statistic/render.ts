import { getUserSettings } from '../../api/settings-api/setting-api';
import { generalState } from '../../states/generalState';
import { getDateToday } from '../../utils';
import renderFooter from '../main-page/components/footer/footer';
import renderHeader, { handleHeaderListeners } from '../main-page/components/header/header';
import { getLearnedWordsToday, getNewWordsToday } from './settings';
import './statistic.scss';

async function renderStatisticMiniGames(): Promise<string> {
  const settings = await getUserSettings(
    generalState.userId as string,
    generalState.token as string
  );

  const today = getDateToday();
  let html: string;
  const todayNewWords = await getNewWordsToday();
  const todayLearnedWords = await getLearnedWordsToday();
  console.log(todayLearnedWords ? '1' : false);

  if (settings?.optional.dayToday !== today) {
    html = `
    <div class="statistic-item">
      <h3 class="statistic-item__header">Mini-game statistics</h3>
      <div class="game-statistic-wrapper">
        <div class="statistic-item__game">
          You haven't play any game today
        </div>
      </div>
    </div>
    <div class="statistic-item">
      <h3 class="statistic-item__header">Word statistic</h3>
      <p>${todayLearnedWords.length ? `Today you learned ${todayLearnedWords.length} new words. Congratulation` : 'You haven\'t learned a single word today. You may better.'}</p>
    </div>
  `;
  } else {
    const sprintWords = todayNewWords.filter(
      (word) => word.optional.whereLearned === 'sprint-game' && word.optional.isNew === true
    );

    const audioWords = todayNewWords.filter(
      (word) => word.optional.whereLearned === 'audio-game' && word.optional.isNew === true
    );

    const middlePercentageRightAnswer = (settings.optional.audioGame.percentageRightAnswer &&
      settings.optional.sprintGame.percentageRightAnswer) ?
      (settings.optional.audioGame.percentageRightAnswer &&
        settings.optional.sprintGame.percentageRightAnswer) / 2 :
      (settings.optional.audioGame.percentageRightAnswer ||
        settings.optional.sprintGame.percentageRightAnswer);

    html = `
    <div class="statistic-item">
      <h3 class="statistic-item__header">Mini-game statistics</h3>
      <div class="game-statistic-wrapper">
        <div class="statistic-item__game">Sprint:
          <p>Count new word today: ${sprintWords.length}</p>
          <p>Percentage right answer: ${settings.optional.sprintGame.percentageRightAnswer ? Math.floor(settings.optional.sprintGame.percentageRightAnswer * 100) : 0} %</p>
          <p>Longest series of correct answers: ${settings.optional.sprintGame.maxRightAnswerInRow ? settings.optional.sprintGame.maxRightAnswerInRow : 0}</p>
        </div>
        <div class="statistic-item__game">Audio call:
          <p>Count new word today: ${audioWords.length}</p>
          <p>Percentage right answer: ${settings.optional.audioGame.percentageRightAnswer ? Math.floor(settings.optional.audioGame.percentageRightAnswer * 100) : 0} %</p>
          <p>Longest series of correct answers: ${settings.optional.audioGame.maxRightAnswerInRow ? settings.optional.audioGame.maxRightAnswerInRow : 0}</p>
        </div>
      </div>
    </div>
    <div class="statistic-item">
      <h3 class="statistic-item__header">Word statistic</h3>
      <p>Number of new word today: ${todayNewWords.length}</p>
      <p>Number of learned words today: ${todayLearnedWords.length}</p>
      <p>Percentage right answer today: ${middlePercentageRightAnswer * 100} %</p>
    </div>
  `;
  }
  return html;
}

export default async function renderStatistic(): Promise<void> {
  const { body } = document;

  const html = `
    ${renderHeader()}
    ${generalState.userId ? `
    <main class="main">
      <div class="statistic">
        ${await renderStatisticMiniGames()}
      </div>
    </main>
    `
      :
      ` 
      <main class="main">
        <div class="statistic">
          You are not authorized
        </div>
      </main>`
    }
  ${renderFooter()}

`;

  body.innerHTML = html;
  handleHeaderListeners();
}
