import {
  postFilterUserWord,
  deleteFilterUserWord,
} from '../../../../../api/Words/WordsAPI';
import { headerState } from '../../../../../components/main-page/components/header/header';
import { UserWord } from '../../../../../types/everydayTypes/userWord';
import IWordCard from '../../../../../types/interfaces/words';
import renderBoard from '../../Board/board';

const cardState = {
  audioIndex: 0,
  activeAudio: false,
};

export const filterState = {
  typeFilter: {},
  filter: {},
};

function renderWordCard(word: IWordCard) {
  return `
  <li data-id="${word.id || word._id}" class=${
    word.userWord?.optional?.isDeleted === true
      ? 'deleted-word__card'
      : word.userWord?.difficulty === 'hard'
      ? 'hard-word__card'
      : ''
  }>
    <div class="card-header" style = "background-image: url(./${word.image})">
      <div class="card-header__overlay">
        ${
          headerState.isLogin
            ? `<div class="buttons-block">
                  ${
                    word.userWord
                      ? word.userWord?.optional?.isDeleted
                        ? ''
                        : `<button class=${
                            word.userWord?.difficulty
                              ? 'back-word__btn'
                              : 'add-word__btn'
                          }>
                <svg>
                  <use xlink:href="./assets/svg/sprite/wordCard.svg#${
                    word.userWord?.difficulty ? 'minus' : 'add'
                  }"></use>
                </svg>
              </button>`
                      : `<button class="add-word__btn">
                <svg>
                  <use xlink:href="./assets/svg/sprite/wordCard.svg#add"></use>
                </svg>
              </button>`
                  }
                  ${
                    word.userWord
                      ? `<button class=${
                          word.userWord?.optional?.isDeleted === true
                            ? 'save-word__btn'
                            : 'remove-word__btn'
                        }>
                <svg>
                  <use xlink:href="./assets/svg/sprite/wordCard.svg#${
                    word.userWord?.optional?.isDeleted ? 'save' : 'delete'
                  }"></use>
                </svg>
              </button>`
                      : `<button class="remove-word__btn">
                <svg>
                  <use xlink:href="./assets/svg/sprite/wordCard.svg#delete"></use>
                </svg>
              </button>`
                  }
      </div>`
            : ''
        }
    <div class="card-header__block">
      <h3>${word.word} </h3>
        <div class="card-header__info">
          <div>${word.wordTranslate} </div>
            <div> ${word.transcription} </div>
              <button class="sound-word__btn" >
                <svg>
                <use xlink: href = "./assets/svg/sprite/general.svg#sound" > </use>
                  </svg>
                  <audio class="audio-word" src = "./${word.audio}" >
                    <audio class="audio-example" src = "./${
                      word.audioExample
                    }" >
                      <audio class="audio-meaning" src = "./${
                        word.audioMeaning
                      }" ></audio>
              </button>
            </div>
          </div>
          </div>
        </div>
        <div class="card-content" >
          <div class="card-content__block" >
          <div class="card-content__example" > ${word.textExample} </div>
          <div class="card-content__example" > ${word.textMeaning} </div>
        </div>
        <div class="card-content__block" >
          <div class="card-content__example" > ${word.textExampleTranslate} 
        </div>
      </div>
    <div class="card-content__example"> ${word.textMeaningTranslate} </div>
  </div>
  </li>
  `;
}

export function handleCardListeners() {
  const cardsList = document.querySelectorAll('.words-list li');

  cardsList.forEach((card) => {
    card.addEventListener('click', handleBookWordCard);
  });
}

async function handleBookWordCard(event: Event) {
  const target = event.target as HTMLElement;
  const currentTarget = event.currentTarget as HTMLElement;
  const user = JSON.parse(localStorage.getItem('userData') as string);
  const { userId, token } = user;

  const WordId = currentTarget.getAttribute('data-id') as string;
  let options: UserWord;

  if (target.closest('.add-word__btn')) {
    options = {
      difficulty: 'hard',
      optional: {},
    };

    await postFilterUserWord(userId, token, WordId, options);

    renderBoard();
  } else if (target.closest('.remove-word__btn')) {
    options = {
      difficulty: 'easy',
      optional: {
        isDeleted: true,
      },
    };

    await postFilterUserWord(userId, token, WordId, options);

    renderBoard();
  } else if (target.closest('.back-word__btn')) {
    await deleteFilterUserWord(userId, token, WordId);

    renderBoard();
  } else if (target.closest('.save-word__btn')) {
    await deleteFilterUserWord(userId, token, WordId);

    renderBoard();
  } else if (target.closest('.sound-word__btn')) {
    if (cardState.activeAudio === false) {
      cardState.audioIndex = 0;
      PlayAudioCard(currentTarget);
    }
  }
}

function PlayAudioCard(card: HTMLElement) {
  cardState.activeAudio = true;

  let audio: HTMLAudioElement | string = '';

  if (cardState.audioIndex === 0) {
    audio = card.querySelector('.audio-word') as HTMLAudioElement;
    cardState.audioIndex += 1;
  } else if (cardState.audioIndex === 1) {
    audio = card.querySelector('.audio-example') as HTMLAudioElement;
    cardState.audioIndex += 1;
  } else if (cardState.audioIndex === 2) {
    audio = card.querySelector('.audio-meaning') as HTMLAudioElement;
    cardState.audioIndex += 1;
  } else if (cardState.audioIndex > 2) {
    cardState.activeAudio = false;
    return;
  }

  (audio as HTMLAudioElement).play();
  (audio as HTMLAudioElement).addEventListener(
    'ended',
    () => {
      PlayAudioCard(card);
    },
    { once: true }
  );
}

export default renderWordCard;
