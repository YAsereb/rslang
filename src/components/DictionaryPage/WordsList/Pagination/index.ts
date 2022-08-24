import './style.scss';
import { dictionaryVariables } from '../..';
import renderWordsList from '..';

function renderPagination() {
  return `  <div class="pagination">
                <ul>
                    <li><span class="btn">Prev</span></li>
                    <li><span class="numb">1</span></li>
                    ${
                      dictionaryVariables.currentPage > 4
                        ? '<li><span class="dots">...</span></li>'
                        : '<li><span class="numb">2</span></li>'
                    }
                    ${
                      dictionaryVariables.currentPage < 5
                        ? '<li><span class="numb">3</span></li>'
                        : `<li><span class="numb">${
                            dictionaryVariables.currentPage > 26
                              ? '26'
                              : `${dictionaryVariables.currentPage - 1}`
                          }</span></li>`
                    }
                    ${
                      dictionaryVariables.currentPage < 5
                        ? '<li><span class="numb">4</span></li>'
                        : `<li><span class="numb">${
                            dictionaryVariables.currentPage > 26
                              ? '27'
                              : `${dictionaryVariables.currentPage}`
                          }</span></li>`
                    }
                      ${
                        dictionaryVariables.currentPage < 5
                          ? '<li><span class="numb">5</span></li>'
                          : `<li><span class="numb">${
                              dictionaryVariables.currentPage > 26
                                ? '28'
                                : `${dictionaryVariables.currentPage + 1}`
                            }</span></li>`
                      }
                    ${
                      dictionaryVariables.currentPage < 27
                        ? '<li><span class="dots">...</span></li>'
                        : '<li><span class="numb">29</span></li>'
                    }
                    <li><span class="numb">30</span></li>
                    <li><span class="btn">Next</span></li>
                </ul>
            </div>
        `;
}

export function handlePaginationListeners() {
  const pagination = document.querySelector('.pagination ul');

  pagination?.addEventListener('click', changePage);
}

export function handlePaginationState() {
  const btns = document.querySelectorAll('.numb');

  btns.forEach((btn) => {
    if (Number(btn.textContent) === dictionaryVariables.currentPage) {
      btn.classList.add('active-page');
    }
  });
}

function changePage(event: Event) {
  const target = event.target as HTMLElement;
  dictionaryVariables.prevPage = dictionaryVariables.currentPage;

  if (target.classList.contains('numb')) {
    dictionaryVariables.currentPage = Number(target.textContent);
  } else if (target.classList.contains('btn')) {
    changeNextOrPrevPage(target);
  } else {
    return;
  }

  if (dictionaryVariables.currentPage !== dictionaryVariables.prevPage) {
    renderWordsList();
  }
}

function changeNextOrPrevPage(element: HTMLElement) {
  if (element.textContent === 'Prev') {
    dictionaryVariables.currentPage -= 1;
    if (dictionaryVariables.currentPage < 1) {
      dictionaryVariables.currentPage = 1;
    }
  } else {
    dictionaryVariables.currentPage += 1;
    if (dictionaryVariables.currentPage > 30) {
      dictionaryVariables.currentPage = 30;
    }
  }
}

export default renderPagination;
