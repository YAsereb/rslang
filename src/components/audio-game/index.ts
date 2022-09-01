import { generalState } from '../../states/generalState';
import { renderStartGame, renderWords } from './render';

export default function audioGameStart() {
  if (generalState.previousURL !== 'book') {
    renderStartGame();
  } else {
    renderWords(generalState.currentPage, generalState.currentGroup);
  }
}
