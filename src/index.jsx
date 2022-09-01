<li data-id="${word.id || word._id}" class=${word.userWord?.optional?.isDeleted === true ? 'deleted-word__card'
  : word.userWord?.difficulty === 'hard' ? 'hard-word__card' : ''}>
  <div class="card-header" style="background-image: url(./${word.image})">
    <div class="card-header__overlay">
      ${headerState.isLogin ? `<div class="buttons-block">
                  ${word.userWord ? word.userWord?.optional?.isDeleted ? ''
          : `<button class=${word.userWord?.difficulty ? 'back-word__btn' : 'add-word__btn'}>
                <svg>
                  <use xlink:href="./assets/svg/sprite/wordCard.svg#${word.userWord?.difficulty ? 'minus' : 'add'}"></use>
                </svg>
              </button>`
          : `<button class="add-word__btn">
                <svg>
                  <use xlink:href="./assets/svg/sprite/wordCard.svg#add"></use>
                </svg>
              </button>`}
                  ${word.userWord ? `<button class=${word.userWord?.optional?.isDeleted === true ? 'save-word__btn' : 'remove-word__btn'}>
                <svg>
                  <use xlink:href="./assets/svg/sprite/wordCard.svg#${word.userWord?.optional?.isDeleted ? 'save' : 'delete'}"></use>
                </svg>
              </button>`
          : `<button class="remove-word__btn">
                <svg>
                  <use xlink:href="./assets/svg/sprite/wordCard.svg#delete"></use>
                </svg>
              </button>`}
      </div>` : ''}
      <div class="card-header__block">
        <h3>${word.word} </h3>
        <div class="card-header__info">
          <div>${word.wordTranslate} </div>
          <div> ${word.transcription} </div>
          <button class="sound-word__btn" >
            <svg>
              <use xlink: href = "./assets/svg/sprite/wordCard.svg#volume" > </use>
            < /svg>
            < audio class="audio-word" src="./${word.audio}" >
              <audio class="audio-example" src="./${word.audioExample}" >
                <audio class="audio-meaning" src="./${word.audioMeaning}" ></audio>
              </button>
              < /div>
              < /div>
              < /div>
              < /div>
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
            </div>
        </div>
      </li>