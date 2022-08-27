import { AnswerWord, Words } from '../../types';
import { renderWords } from './render';
import { state } from './state';

export function setRandomStatePage() {
  const min = 0;
  const max = 30;
  const page = Math.floor(Math.random() * (max - min));
  state.page = page;
}

export function getRandomIndex(words: Words) {
  const randomIndex = Math.floor((Math.random() * words.length));
  return randomIndex;
}

export function getWordsArray(words: Words) {
  const trueIndex = getRandomIndex(words);
  const trueWord = words[trueIndex];

  state.trueWordId = trueWord.id;
  state.trueWord = trueWord.word;
  state.trueWordAudio = trueWord.audio;
  state.trueWordAudioExample = trueWord.audioExample;
  state.imageSrc = trueWord.image;
  state.wordTranslate = trueWord.wordTranslate;

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
  state.group = +group;
}

export function handleGroup(event: Event) {
  setChosenToStateGroup(event);
  setRandomStatePage();

  renderWords(state.page, state.group);
}

async function handleAnswer() {
  const img = document.querySelector('.audio-img') as HTMLImageElement;
  const trueWordParagraph = document.querySelector('#true-word') as HTMLElement;
  trueWordParagraph.textContent = state.trueWord;
  trueWordParagraph.hidden = false;

  img.src = `../../assets/${state.imageSrc}`;
  setRandomStatePage();

  state.countAnswer += 1;
  setTimeout(await renderWords, 2000);
}

function addTrueWord({ trueWord, trueWordAudio, wordTranslate }: AnswerWord) {
  state.trueAnswers.push({ trueWord, trueWordAudio, wordTranslate });
}

function addFalseWord({ trueWord, trueWordAudio, wordTranslate }: AnswerWord) {
  state.falseAnswers.push({ trueWord, trueWordAudio, wordTranslate });
}

function isTrueWord(element: HTMLElement) {
  element.classList.add('winner-word');

  const { trueWord, trueWordAudio, wordTranslate } = state;

  addTrueWord({ trueWord, trueWordAudio, wordTranslate });
  handleAnswer();
}

function isFalseWord(element: HTMLElement) {
  element.classList.add('lose-word');

  const { trueWord, trueWordAudio, wordTranslate } = state;

  addFalseWord({ trueWord, trueWordAudio, wordTranslate });
  handleAnswer();
}

export function handleAudioGame(event: Event) {
  if (state.isButtonActive) return;
  const target = event.target as HTMLElement;

  if (!target.hasAttribute('id')) return;

  const id = target.getAttribute('id');

  if (id === state.trueWordId) {
    isTrueWord(target);
    state.isButtonActive = true;
  } else {
    isFalseWord(target);
    state.isButtonActive = true;
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
