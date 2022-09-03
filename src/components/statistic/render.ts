import renderFooter from '../main-page/components/footer/footer';
import renderHeader from '../main-page/components/header/header';

function renderStatisticPerDay(): string {

}

function renderStatisticMiniGames() {

}

function renderStatisticWords() {

}

export function renderStatistic() {
  const { body } = document;

  body.innerHTML = `
    ${renderHeader()}
    ${renderStatisticPerDay()}
    ${renderStatisticMiniGames()}
    ${renderStatisticWords()}
    ${renderFooter()}
  `;
}
