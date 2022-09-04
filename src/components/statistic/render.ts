import { getUserStatistic } from '../../api/statistic/statistic-api';
import { generalState } from '../../states/generalState';
import renderFooter from '../main-page/components/footer/footer';
import renderHeader from '../main-page/components/header/header';
import './statistic.scss';

function renderStatisticMiniGames(): string {
  return `
  <div class="statistic-item">
    <h3 class="statistic-item__header">Mini-game statistics</h3>
    <div class="game-statistic-wrapper">
      <div class="statistic-item__game">Sprint:
        <p>Count new word today</p>
        <p>Percentage right answer</p>
        <p>Longest series of correct answers</p>
      </div>
      <div class="statistic-item__game">Audio call:
        <p>Count new word today</p>
        <p>Percentage right answer</p>
        <p>Longest series of correct answers</p>
      </div>
    </div>
  </div>
  `;
}

async function renderStatisticWords(): Promise<string> {
  const statistic = await getUserStatistic(
    generalState.userId as string,
    generalState.token as string
  );

  console.log(statistic);
  return `
  <div class="statistic-item">
    <h3 class="statistic-item__header">Word statistic</h3>
  </div>
  `;
}

export default async function renderStatistic(): Promise<void> {
  const { body } = document;

  body.innerHTML = `
    ${renderHeader()}
    <div class="statistic">
      ${renderStatisticMiniGames()}
      ${renderStatisticWords()}
    </div>
    ${renderFooter()}
  `;
}
