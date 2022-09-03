import { AnswerWord, Words } from '../../types';
import { renderWords } from './render';
import { audioGameState } from '../../states/audioGameState';
<<<<<<< HEAD
// import { getUserToken, getUserId } from '../../utils';
// import handleProgress from '../progress/progress';
=======
import handleProgress from '../progress/progress';
import { generalState } from '../../states/generalState';
>>>>>>> 1038f0aa66b8eb849d214e2098b66566d70507d5

export function setRandomStatePage() {
  const min = 0;
  const max = 30;
  const page = Math.floor(Math.random() * (max - min));
  audioGameState.page = page;
}

export function getRandomIndex(words: Words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  return randomIndex;
}

export function getWordsArray(words: Words) {
  const trueIndex = getRandomIndex(words);
  const trueWord = words[trueIndex];

  audioGameState.trueWordId = trueWord.id;
  audioGameState.trueWord = trueWord.word;
  audioGameState.trueWordAudio = trueWord.audio;
  audioGameState.trueWordAudioExample = trueWord.audioExample;
  audioGameState.imageSrc = trueWord.image;
  audioGameState.wordTranslate = trueWord.wordTranslate;

  let i = 0;
  const wordsArray: Words = [trueWord];

  while (i < 4) {
    const randomIndex = getRandomIndex(words);
    if (trueIndex !== randomIndex && !wordsArray.includes(words[randomIndex])) {
      wordsArray.push(words[randomIndex]);
      i += 1;
    }
  }
  wordsArray.sort((a, b) => (a.id > b.id ? -1 : 1));
  return wordsArray;
}

export function setChosenToStateGroup(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.classList.contains('group-level')) return;
  const group = target.textContent as string;
  audioGameState.group = +group;
}

export function handleGroup(event: Event) {
  setChosenToStateGroup(event);
  setRandomStatePage();

  renderWords(audioGameState.page, audioGameState.group);
}

async function handleAnswer(answer: boolean) {
  const img = document.querySelector('.audio-img') as HTMLImageElement;
  const trueWordParagraph = document.querySelector('#true-word') as HTMLElement;
  trueWordParagraph.textContent = audioGameState.trueWord;
  trueWordParagraph.hidden = false;

<<<<<<< HEAD
  // const userId = await getUserId();
  // const token = getUserToken();
  // const word = await handleProgress(userId, audioGameState.trueWordId, token);
=======
  const { userId, token } = generalState;
  await handleProgress(
    (userId as string),
    audioGameState.trueWordId, (
    token as string),
    answer
  );
>>>>>>> 1038f0aa66b8eb849d214e2098b66566d70507d5

  img.src = `../../${audioGameState.imageSrc}`;
  setRandomStatePage();

  audioGameState.countAnswer += 1;
  setTimeout(await renderWords, 2000);
}

function addTrueWord({ trueWord, trueWordAudio, wordTranslate }: AnswerWord) {
  audioGameState.trueAnswers.push({ trueWord, trueWordAudio, wordTranslate });
}

function addFalseWord({ trueWord, trueWordAudio, wordTranslate }: AnswerWord) {
  audioGameState.falseAnswers.push({ trueWord, trueWordAudio, wordTranslate });
}

async function isTrueWord(element: HTMLElement) {
  element.classList.add('winner-word');

  const { trueWord, trueWordAudio, wordTranslate } = audioGameState;

  addTrueWord({ trueWord, trueWordAudio, wordTranslate });
  await handleAnswer(true);
}

async function isFalseWord(element: HTMLElement) {
  element.classList.add('lose-word');

  const { trueWord, trueWordAudio, wordTranslate } = audioGameState;

  addFalseWord({ trueWord, trueWordAudio, wordTranslate });
  await handleAnswer(false);
}

export async function handleAudioGame(event: Event) {
  if (audioGameState.isButtonActive) return;
  const target = event.target as HTMLElement;

  if (!target.hasAttribute('id')) return;

  const id = target.getAttribute('id');

  if (id === audioGameState.trueWordId) {
    await isTrueWord(target);
    audioGameState.isButtonActive = true;
  } else {
    await isFalseWord(target);
    audioGameState.isButtonActive = true;
  }
}

export function handlePlayAudio() {
  const audioPlayer = document.querySelector('audio') as HTMLAudioElement;

  audioPlayer.load();
  audioPlayer.play();
}

export function playAudio() {
  const audioPlayer = document.querySelector('audio') as HTMLAudioElement;

  audioPlayer.play();
}

export function playAudioEndGame(event: Event) {
  const target = event.target as HTMLElement;
  const audioPlayer = target.nextElementSibling as HTMLAudioElement;
  audioPlayer.muted = false;

  audioPlayer.play();
}
