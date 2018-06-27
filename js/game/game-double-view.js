import AbstractView from '../abstract-view';
import {debugStyle} from '../util';
import {resize} from '../resize/resize';

class GameDoubleView extends AbstractView {
  constructor(data, debug) {
    super();
    this.debug = debug;
    this.question = data.text;
    this.image1 = data.images[0];
    this.image2 = data.images[1];
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this.image1.src}" alt="${this.image1.alt}" width="${this.image1.width}" height="${this.image1.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this.image1.name}" type="radio" value="photo" required>
            <span ${debugStyle(this.debug, this.image1.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="${this.image1.name}" type="radio" value="paint" required>
            <span ${debugStyle(this.debug, this.image1.rightValue === `paint`)}>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this.image2.src}" alt="${this.image2.alt}" width="${this.image2.width}" height="${this.image2.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this.image2.name}" type="radio" value="photo" required>
            <span ${debugStyle(this.debug, this.image2.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="${this.image2.name}" type="radio" value="paint" required>
            <span ${debugStyle(this.debug, this.image2.rightValue === `paint`)}>Рисунок</span>
          </label>
        </div>
      </form>
    </div>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, () => {
      if (!gameContent.reportValidity()) {
        return;
      }
      const rightAnswer1 = this.image1.rightValue;
      const rightAnswer2 = this.image2.rightValue;
      const option1 = gameContent.elements[this.image1.name].value;
      const option2 = gameContent.elements[this.image2.name].value;
      const result = option1 === rightAnswer1 && option2 === rightAnswer2;
      this.onAnswer(result);
    });

    const options = this.element.querySelectorAll(`.game__option img`);
    for (const item of options) {
      item.addEventListener(`load`, (evt) => {
        const imageSize = {width: evt.target.naturalWidth, height: evt.target.naturalHeight};
        const frameSize = {width: evt.target.width, height: evt.target.height};
        const newSize = resize(frameSize, imageSize);
        evt.target.width = newSize.width;
        evt.target.height = newSize.height;
      });
    }
  }

  onAnswer() {}
}

export default GameDoubleView;
