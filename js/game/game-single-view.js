import AbstractView from '../abstract-view';
import {debugStyle} from '../util';
import {resize} from '../resize/resize';
import Settings from '../settings';

class GameSingleView extends AbstractView {
  constructor(data) {
    super();
    this._debug = Settings.DEBUG;
    this._question = data.text;
    this._image = data.images[0];
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this._image.src}" alt="${this._image.alt}" width="${this._image.width}" height="${this._image.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this._image.name}" type="radio" value="photo" required>
            <span ${debugStyle(this._debug, this._image.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer game__answer--paint game__answer--wide">
            <input name="${this._image.name}" type="radio" value="paint" required>
            <span ${debugStyle(this._debug, this._image.rightValue === `paint`)}>Рисунок</span>
          </label>
        </div>
      </form>
    </div>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, () => {
      const option = gameContent.elements[this._image.name].value;
      this.onAnswer(option === this._image.rightValue);
    });

    const image = this.element.querySelector(`.game__option img`);
    image.addEventListener(`load`, (evt) => {
      const imageSize = {width: evt.target.naturalWidth, height: evt.target.naturalHeight};
      const frameSize = {width: evt.target.width, height: evt.target.height};
      const newSize = resize(frameSize, imageSize);
      evt.target.width = newSize.width;
      evt.target.height = newSize.height;
    });
  }

  onAnswer() {}
}

export default GameSingleView;
