import AbstractView from '../abstract-view';
import {debugStyle} from '../util';
import {fitIntoBox} from '../resize/resize';
import Settings from '../settings';

class GameDoubleView extends AbstractView {
  constructor(data) {
    super();
    this._debug = Settings.DEBUG;
    this._question = data.text;
    this._image1 = data.images[0];
    this._image2 = data.images[1];
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this._image1.src}" alt="${this._image1.alt}" width="${this._image1.width}" height="${this._image1.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this._image1.name}" type="radio" value="photo" required>
            <span ${debugStyle(this._debug, this._image1.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="${this._image1.name}" type="radio" value="paint" required>
            <span ${debugStyle(this._debug, this._image1.rightValue === `paint`)}>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this._image2.src}" alt="${this._image2.alt}" width="${this._image2.width}" height="${this._image2.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this._image2.name}" type="radio" value="photo" required>
            <span ${debugStyle(this._debug, this._image2.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="${this._image2.name}" type="radio" value="paint" required>
            <span ${debugStyle(this._debug, this._image2.rightValue === `paint`)}>Рисунок</span>
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
      const rightAnswer1 = this._image1.rightValue;
      const rightAnswer2 = this._image2.rightValue;
      const option1 = gameContent.elements[this._image1.name].value;
      const option2 = gameContent.elements[this._image2.name].value;
      const result = option1 === rightAnswer1 && option2 === rightAnswer2;
      this.onAnswer(result);
    });

    const options = this.element.querySelectorAll(`.game__option img`);
    for (const item of options) {
      item.addEventListener(`load`, (evt) => {
        fitIntoBox(evt.target);
      });
    }
  }

  onAnswer() {}
}

export default GameDoubleView;
