import dicAndBookVars from '../../..';
import renderBoard from '../../../components/Board/board';
import './style.scss';

function renderPagination() {
  return `  <div class="pagination">
                <ul>
                    <li><span class="btn">Prev</span></li>
                    <li><span class="numb">1</span></li>
                    ${
                      dicAndBookVars.currentPage > 4
                        ? '<li><span class="dots">...</span></li>'
                        : '<li><span class="numb">2</span></li>'
                    }
                    ${
                      dicAndBookVars.currentPage < 5
                        ? '<li><span class="numb">3</span></li>'
                        : `<li><span class="numb">${
                            dicAndBookVars.currentPage > 26
                              ? '26'
                              : `${dicAndBookVars.currentPage - 1}`
                          }</span></li>`
                    }
                    ${
                      dicAndBookVars.currentPage < 5
                        ? '<li><span class="numb">4</span></li>'
                        : `<li><span class="numb">${
                            dicAndBookVars.currentPage > 26
                              ? '27'
                              : `${dicAndBookVars.currentPage}`
                          }</span></li>`
                    }
                      ${
                        dicAndBookVars.currentPage < 5
                          ? '<li><span class="numb">5</span></li>'
                          : `<li><span class="numb">${
                              dicAndBookVars.currentPage > 26
                                ? '28'
                                : `${dicAndBookVars.currentPage + 1}`
                            }</span></li>`
                      }
                    ${
                      dicAndBookVars.currentPage < 27
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
    if (Number(btn.textContent) === dicAndBookVars.currentPage) {
      btn.classList.add('active-page');
    }
  });
}

function changePage(event: Event) {
  const target = event.target as HTMLElement;
  dicAndBookVars.prevPage = dicAndBookVars.currentPage;

  if (target.classList.contains('numb')) {
    dicAndBookVars.currentPage = Number(target.textContent);
  } else if (target.classList.contains('btn')) {
    changeNextOrPrevPage(target);
  } else {
    return;
  }

  if (dicAndBookVars.currentPage !== dicAndBookVars.prevPage) {
    renderBoard();
  }
}

function changeNextOrPrevPage(element: HTMLElement) {
  if (element.textContent === 'Prev') {
    dicAndBookVars.currentPage -= 1;
    if (dicAndBookVars.currentPage < 1) {
      dicAndBookVars.currentPage = 1;
    }
  } else {
    dicAndBookVars.currentPage += 1;
    if (dicAndBookVars.currentPage > 30) {
      dicAndBookVars.currentPage = 30;
    }
  }
}

export default renderPagination;
