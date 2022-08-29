import { renderStartGame } from './render';
import { audioGameState } from './state';

export default async function audioGameStart() {
  const baseLink = 'http://localhost:8000';
  if (audioGameState.prevPage !== `${baseLink}/main-page`) renderStartGame(); // TODO: поменять сравнение;
  // renderWords(this.page, this.gruop);
}
