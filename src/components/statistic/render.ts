import renderFooter from '../main-page/components/footer/footer';
import renderHeader from '../main-page/components/header/header';

function renderStatisticPerDay(): string {
  return '';
}

function renderStatisticMiniGames(): string {
  return '';
}

function renderStatisticWords(): string {
  return '';
}

export default function renderStatistic(): void {
  const { body } = document;

  body.innerHTML = `
    ${renderHeader()}
    ${renderStatisticPerDay()}
    ${renderStatisticMiniGames()}
    ${renderStatisticWords()}
    ${renderFooter()}
  `;
}
