import { AnswerWord } from '../../types';
import { renderWords } from './render';
import { audioGameState } from '../../states/audioGameState';
import handleProgress from '../progress/progress';
import variables from '../../variables';
import IWordCard from '../../types/interfaces/words';
import { generalState } from '../../states/generalState';

export function setRandomStatePage() {
  const min = 1;
  const max = 30;
  const page = Math.floor(Math.random() * (max - min));
  audioGameState.page = page;
}

export function getRandomIndex(words: IWordCard[]) {
  const randomIndex = Math.floor(Math.random() * words.length);
  return randomIndex;
}

export function getWordsArray(words: IWordCard[]) {
  const trueIndex = getRandomIndex(words);
  const trueWord = words[trueIndex];

  audioGameState.trueWordId = trueWord.id as string;
  audioGameState.trueWord = trueWord.word;
  audioGameState.trueWordAudio = trueWord.audio;
  audioGameState.imageSrc = trueWord.image;
  audioGameState.wordTranslate = trueWord.wordTranslate;

  let i = 0;

  const wordsArray: IWordCard[] = [trueWord];

  const arrLength = generalState.currentData.length > 4 ? 4 : generalState.currentData.length;

  while (i < arrLength) {
    const randomIndex = getRandomIndex(words);
    if (trueIndex !== randomIndex && !wordsArray.includes(words[randomIndex])) {
      wordsArray.push(words[randomIndex]);
      i += 1;
    }
  }
  wordsArray.sort((a, b) => ((a.id as string || a._id as string) >
    (b.id as string || b._id as string) ? -1 : 1));
  return wordsArray;
}

export function setChosenToStateGroup(event: Event) {
  const target = event.target as HTMLElement;
  console.log(target);
  if (!target.classList.contains('group-level')) return;
  const group = target.textContent as string;
  console.log(group);
  audioGameState.group = +group;
}

export function handleGroup(event: Event) {
  setChosenToStateGroup(event);
  setRandomStatePage();

  renderWords(audioGameState.group, audioGameState.page);
}

async function handleAnswer(answer: boolean) {
  const img = document.querySelector('.audio-img') as HTMLImageElement;
  const trueWordParagraph = document.querySelector('#true-word') as HTMLElement;
  trueWordParagraph.textContent = audioGameState.trueWord;
  trueWordParagraph.hidden = false;

  await handleProgress(audioGameState.trueWordId, answer, 'audio-game');

  img.src = `${variables.URL}/${audioGameState.imageSrc}`;
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
