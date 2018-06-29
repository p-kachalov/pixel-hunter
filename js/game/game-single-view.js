import AbstractView from '../abstract-view';
import {debugStyle} from '../util';
import {resize} from '../resize/resize';
import Settings from '../settings';

class GameSingleView extends AbstractView {
  constructor(data) {
    super();
    this.debug = Settings.DEBUG;
    this.question = data.text;
    this.image = data.images[0];
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.image.src}" alt="${this.image.alt}" width="${this.image.width}" height="${this.image.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this.image.name}" type="radio" value="photo" required>
            <span ${debugStyle(this.debug, this.image.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer game__answer--paint game__answer--wide">
            <input name="${this.image.name}" type="radio" value="paint" required>
            <span ${debugStyle(this.debug, this.image.rightValue === `paint`)}>Рисунок</span>
          </label>
        </div>
      </form>
    </div>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, () => {
      const option = gameContent.elements[this.image.name].value;
      this.onAnswer(option === this.image.rightValue);
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
