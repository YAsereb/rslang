import IWordCard from '../../../../types/interfaces/words';

function renderWordCard(e: IWordCard) {
  return `<li>
            <div class="card-header" style="background-image: url(./${e.image})"}>
              <div class="card-header__overlay">
                <div class="card-header__block">
                  <h3>${e.word}</h3>
                  <div class="card-header__info">
                    <div>${e.wordTranslate}</div>
                    <div>${e.transcription}</div>
                    <button>зв</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="card-content__block">
                <div class="card-content__example">${e.textExample}</div>
                <div class="card-content__example">${e.textMeaning}</div>
              </div>
              <div class="card-content__block">
                <div class="card-content__example">${e.textExampleTranslate}</div>
                <div class="card-content__example">${e.textMeaningTranslate}</div>
              </div>
            </div>
          </li>



          `;
}

export default renderWordCard;
