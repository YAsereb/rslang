import audioGameStart from './components/audio-game';
import { audioGameState } from './components/audio-game/state';

function start() {
  const { href } = window.location;
  audioGameState.prevPage = href;

  audioGameStart();
}

start();
