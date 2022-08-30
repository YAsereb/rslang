import { generalState } from '../../types/everydayTypes/generalState';
import { renderStartGame, renderWords } from './render';

export default function audioGameStart() {
  console.log(generalState.currentURL, generalState.previousURL);
  if (generalState.previousURL !== 'book') {
    renderStartGame();
  } else {
    renderWords(generalState.currentPage, generalState.currentGroup);
  }
}
