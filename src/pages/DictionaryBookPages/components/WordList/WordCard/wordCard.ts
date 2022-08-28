import {
  filterState,
  postFilterUserWord,
  putFilterUserWord,
} from '../../../../../api/Words';
import IWordCard from '../../../../../types/interfaces/words';
import renderBoardBook from '../../../BookPage/components/BookBoard/bookBoard';

function renderWordCard(word: IWordCard) {
  return `<li class=${
    word.userWord ? 'hard-word__card' : 'word__card'
  } data-id="${word.id || word._id}">
            <div class="card-header" style="background-image: url(./${
              word.image
            })"}>
              <div class="card-header__overlay">
                <div class="buttons-block">
                  <button class=${
                    word.userWord ? 'back-word__btn' : 'add-word__btn'
                  }>
                    <svg>
                      <use xlink:href="./assets/svg/sprite/wordCard.svg#${
                        word.userWord ? 'minus' : 'add'
                      }"></use>
                    </svg>
                  </button>
                  <button class="remove-word__btn">
                    <svg>
                      <use xlink:href="./assets/svg/sprite/wordCard.svg#delete"></use>
                    </svg>
                  </button>
                </div>
                <div class="card-header__block">
                  <h3>${word.word}</h3>
                  <div class="card-header__info">
                    <div>${word.wordTranslate}</div>
                    <div>${word.transcription}</div>
                    <button>зв</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="card-content__block">
                <div class="card-content__example">${word.textExample}</div>
                <div class="card-content__example">${word.textMeaning}</div>
              </div>
              <div class="card-content__block">
                <div class="card-content__example">${
                  word.textExampleTranslate
                }</div>
                <div class="card-content__example">${
                  word.textMeaningTranslate
                }</div>
              </div>
            </div>
          </li>
          `;
}

export function handleWordCardListener() {
  const wordCard = document.querySelectorAll('.words-list li');

  wordCard.forEach((card) => {
    card.addEventListener('click', handleWordCard);
  });
}

function handleWordCard(event: Event) {
  const target = event.target as HTMLElement;
  const currentTarget = event.currentTarget as HTMLElement;

  const id = currentTarget.getAttribute('data-id') as string;

  if (target.closest('.add-word__btn')) {
    filterState.filter = {
      optional: { hard: true },
    };

    addFilterWord(id);
  } else if (target.closest('.remove-word__btn')) {
    filterState.filter = {
      optional: { isDeleted: true },
    };

    addFilterWord(id);
  } else if (target.closest('.back-word__btn')) {
    filterState.filter = {
      optional: { hard: false },
    };

    changeFilterWord(id);
  }
}

// async function addWordCard(wordId: string) {
//   const user = JSON.parse(localStorage.getItem('userData') as string);

//   const word = { optional: { isDeleted: true } };

//   const { userId, token } = user;

//   // createUserWord(userId, token, wordId, word);
// }

async function changeFilterWord(wordId: string) {
  const user = JSON.parse(localStorage.getItem('userData') as string);

  const { userId, token } = user;

  await putFilterUserWord(userId, token, wordId);

  renderBoardBook();
}

async function addFilterWord(wordId: string) {
  const user = JSON.parse(localStorage.getItem('userData') as string);

  const { userId, token } = user;

  await postFilterUserWord(userId, token, wordId);

  renderBoardBook();
}

export default renderWordCard;
