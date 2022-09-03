import IWordCard from '../../../../types/interfaces/words';

function renderResultWord(word: IWordCard) {
  return `  <li>
                <button class="result-sound__btn">
                <svg>
                  <use xlink: href = "./assets/svg/sprite/general.svg#sound" ></use>
                </svg>
                <audio class="audio-word" src = "http://localhost:8000/${word.audio}" >
                </button>
                <span>${word.word}</span>
                <span>-${word.wordTranslate}</span>
            </li>
            `;
}

export function handleResultWordListeners() {
  const soundBtns = document.querySelectorAll('.result-sound__btn');

  soundBtns.forEach((btn) => {
    btn.addEventListener('click', playSound);
  });
}

function playSound(event: Event) {
  const currentTarget = event.currentTarget as HTMLElement;

  const audio = currentTarget.querySelector('audio');
  audio?.play();
}

export default renderResultWord;
