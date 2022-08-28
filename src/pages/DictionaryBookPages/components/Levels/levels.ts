import dicAndBookVars from '../..';
import renderBoardBook from '../../BookPage/components/BookBoard/bookBoard';

import './style.scss';

function renderLevels() {
  const main = document.querySelector('main') as HTMLElement;

  const html = `
                <div class="levels-list">
                <div class="level-card" data-group="0">
                    <div class="level-card__left">Easy</div>
                    <div class="level-card__right">A1</div>
                    <div class="circle"></div>
                </div>
                <div class="level-card" data-group="1">
                    <div class="level-card__left">Easy</div>
                    <div class="level-card__right">A2</div>
                    <div class="circle"></div>
                </div>
                <div class="level-card" data-group="2">
                    <div class="level-card__left">Medium</div>
                    <div class="level-card__right">B1</div>
                    <div class="circle"></div>
                </div>    
                <div class="level-card" data-group="3">
                    <div class="level-card__left">Medium</div>
                    <div class="level-card__right">B2</div>
                    <div class="circle"></div>
                </div>    
                <div class="level-card" data-group="4">
                    <div class="level-card__left">Hard</div>
                    <div class="level-card__right">C1</div>
                    <div class="circle"></div>
                </div>    
                <div class="level-card" data-group="5">
                    <div class="level-card__left" >Hard</div>
                    <div class="level-card__right">C2</div>
                    <div class="circle"></div>
                </div>                      
            </div> 
             `;

  main.insertAdjacentHTML('afterbegin', html);

  handleLevelsListeners();
  handleLevelsState();
}

function handleLevelsListeners() {
  const levelsList = document.querySelector('.levels-list');

  levelsList?.addEventListener('click', changeLevel);
}

function handleLevelsState() {
  const activeLevel = document.querySelector(
    `[data-group="${dicAndBookVars.currentGroup}"]`
  );

  activeLevel?.classList.add('active-level');
}

function changeLevel(event: Event) {
  const target = event.target as HTMLElement;

  if (target.closest('.level-card')) {
    const card = getLevelCard(target);

    const groupNumber = card.getAttribute('data-group') as string;

    if (Number(groupNumber) !== dicAndBookVars.currentGroup) {
      dicAndBookVars.currentGroup = Number(groupNumber);
      dicAndBookVars.currentPage = 1;
      addActiveStyle(card);
      renderBoardBook();
    }
  }
}

function addActiveStyle(element: HTMLElement) {
  const cards = document.querySelectorAll('.level-card');

  cards.forEach((card) => {
    card.classList.remove('active-level');
  });
  element.classList.add('active-level');
}

function getLevelCard(target: HTMLElement) {
  let card: string | HTMLElement = '';
  if (!target.classList.contains('level-card')) {
    card = target.parentElement as HTMLElement;
  } else {
    card = target;
  }

  return card;
}

export default renderLevels;
