import {
  postFilterUserWord,
  getUserWordById,
} from '../../../../../api/Words/WordsAPI';
import { headerState } from '../../../../../components/main-page/components/header/header';
import { generalState } from '../../../../../states/generalState';
import { UserWord } from '../../../../../types/everydayTypes/userWord';
import IWordCard from '../../../../../types/interfaces/words';
import { getDateToday } from '../../../../../utils';
import variables from '../../../../../variables';

import renderBoard from '../../Board/board';

const cardState = {
  audioIndex: 0,
  activeAudio: false,
};

export const filterState = {
  typeFilter: {},
  filter: {},
};

function renderProgress(word: UserWord): string {
  let html = '';
  if (word && !word.optional.isLearned && word.optional.countAttempt) {
    html = `<div class="progress-word">${word.optional?.countTrueAnswer}/${word.optional?.countAttempt}</div>`;
  }
  return html;
}

function renderAddLearnedButton(word: IWordCard): string {
  let html = '';
  if (!word.userWord?.optional?.isLearned) {
    html = `
    <button class="remove-word__btn">
      <svg>
        <use xlink:href="./assets/svg/sprite/wordCard.svg#delete"></use>
      </svg>
    </button>
    `;
  }

  return html;
}

function renderHandleWordCardButton(word: IWordCard): string {
  const html = `
  <div class="buttons-block">
    <button class=${
      word.userWord?.difficulty === 'hard' ? 'back-word__btn' : 'add-word__btn'
    }>
      <svg>
        <use xlink:href="./assets/svg/sprite/wordCard.svg#${
          word.userWord?.difficulty === 'hard' ? 'minus' : 'add'
        }"></use>
      </svg>
    </button>
    ${renderAddLearnedButton(word)}
  </div>
  `;

  return html;
}

function renderWordCardHeader(word: IWordCard) {
  return `
  <div class="card-header__block">
    <h3>${word.word} </h3>
    <div class="card-header__info">
      <div>${word.wordTranslate} </div>
      <div> ${word.transcription} </div>
      <button class="sound-word__btn">
        <svg>
          <use xlink: href="./assets/svg/sprite/wordCard.svg#volume"> </use>
        </svg>
        <audio class="audio-word" src="${variables.URL}/${word.audio}">
          <audio class="audio-example" src="${variables.URL}/${word.audioExample}">
            <audio class="audio-meaning" src="${variables.URL}/${word.audioMeaning}"></audio>
      </button>
    </div>
  </div>`;
}

function renderWordCardContent(word: IWordCard) {
  return `
  <div class="card-content">
    <div class="card-content__block">
    <div class="card-content__example"> ${word.textExample} </div>
    <div class="card-content__example"> ${word.textMeaning} </div>
  </div>
  <div class="card-content__block">
    <div class="card-content__example"> ${word.textExampleTranslate} </div>
  </div>
  <div class="card-content__example"> ${word.textMeaningTranslate} </div>
</div>
  `;
}

function renderWordCard(word: IWordCard) {
  return `

  <li data-id="${word.id || word._id}" class=${
    word.userWord?.optional?.isLearned === true
      ? 'deleted-word__card'
      : word.userWord?.difficulty === 'hard'
      ? 'hard-word__card'
      : ''
  }>
    <div class="card-header" style = "background-image: url(${variables.URL}/${
    word.image
  })">
      <div class="card-header__overlay">
      ${renderProgress(word.userWord)}
      ${headerState.isLogin ? renderHandleWordCardButton(word) : ''}
    
        ${renderWordCardHeader(word)}
      </div>
    </div>
      ${renderWordCardContent(word)}
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
  const { userId, token } = generalState;
  const today = getDateToday();

  const WordId = currentTarget.getAttribute('data-id') as string;
  let options: UserWord;
  const userWord = await getUserWordById(
    userId as string,
    WordId,
    token as string
  );

  if (target.closest('.add-word__btn')) {
    options = {
      difficulty: 'hard',
      optional: {
        isLastTrueAnswer: userWord?.optional.isLastTrueAnswer || false,
        countTrueAnswerInRow: userWord?.optional.countTrueAnswerInRow || 0,
        countTrueAnswer: userWord?.optional.countTrueAnswer || 0,
        countAttempt: userWord?.optional.countAttempt || 0,
        isLearned: false,
        whenLearnedDate: today,
        whereLearned: 'book',
      },
    };

    await postFilterUserWord(
      userId as string,
      token as string,
      WordId,
      options
    );

    renderBoard();
  } else if (target.closest('.remove-word__btn')) {
    options = {
      difficulty: 'easy',
      optional: {
        isLearned: true,
        isLastTrueAnswer: userWord?.optional.isLastTrueAnswer || false,
        countTrueAnswerInRow: userWord?.optional.countTrueAnswerInRow || 0,
        countTrueAnswer: userWord?.optional.countTrueAnswer || 0,
        countAttempt: userWord?.optional.countAttempt || 0,
        whenLearnedDate: today,
        whereLearned: 'book',
      },
    };

    await postFilterUserWord(
      userId as string,
      token as string,
      WordId,
      options
    );

    renderBoard();
  } else if (target.closest('.back-word__btn')) {
    options = {
      difficulty: 'easy',
      optional: {
        isLearned: false,
        isLastTrueAnswer: userWord?.optional.isLastTrueAnswer || false,
        countTrueAnswerInRow: userWord?.optional.countTrueAnswerInRow || 0,
        countTrueAnswer: userWord?.optional.countTrueAnswer || 0,
        countAttempt: userWord?.optional.countAttempt || 0,
        whenLearnedDate: today,
        whereLearned: 'book',
      },
    };

    await postFilterUserWord(
      userId as string,
      token as string,
      WordId,
      options
    );

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
