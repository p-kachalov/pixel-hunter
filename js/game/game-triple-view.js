import AbstractView from '../abstract-view';
import {debugStyle} from '../util';
import {resize} from '../resize/resize';
import Settings from '../settings';

class GameTripleView extends AbstractView {
  constructor(data) {
    super();
    this._debug = Settings.DEBUG;
    this._question = data.text;
    this._image1 = data.images[0];
    this._image2 = data.images[1];
    this._image3 = data.images[2];
    this._rightValue = data.images.filter((item) => item.rightValue)[0].name;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content game__content--triple">
        <div class="game__option" ${debugStyle(this._debug, this._image1.rightValue)} data-name="${this._image1.name}">
          <img src="${this._image1.src}" alt="${this._image1.alt}" width="${this._image1.width}" height="${this._image1.height}">
        </div>
        <div class="game__option" ${debugStyle(this._debug, this._image2.rightValue)} data-name="${this._image2.name}">
          <img src="${this._image2.src}" alt="${this._image2.alt}" width="${this._image2.width}" height="${this._image2.height}">
        </div>
        <div class="game__option" ${debugStyle(this._debug, this._image3.rightValue)} data-name="${this._image3.name}">
          <img src="${this._image3.src}" alt="${this._image3.alt}" width="${this._image3.width}" height="${this._image3.height}">
        </div>
      </form>
    </div>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, () => {
      const option1 = gameContent.elements[this._image1.name].value;
      const option2 = gameContent.elements[this._image2.name].value;
      this.onAnswer({option1, option2});
    });

    const options = this.element.querySelectorAll(`.game__option`);
    for (const item of options) {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const option = evt.currentTarget.dataset.name;
        const result = option === this._rightValue;
        this.onAnswer(result);
      });

      const image = item.querySelector(`img`);
      image.addEventListener(`load`, (evt) => {
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

export default GameTripleView;
