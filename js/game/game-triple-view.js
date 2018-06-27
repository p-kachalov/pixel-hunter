import AbstractView from '../abstract-view';
import {debugStyle} from '../util';

class GameTripleView extends AbstractView {
  constructor(data, debug) {
    super();
    this.debug = debug;
    this.question = data.text;
    this.image1 = data.images[0];
    this.image2 = data.images[1];
    this.image3 = data.images[2];
    this.rightValue = data.images.filter((item) => item.rightValue)[0].name;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content game__content--triple">
        <div class="game__option" ${debugStyle(this.debug, this.image1.rightValue)}>
          <img data-name="${this.image1.name}" src="${this.image1.src}" alt="${this.image1.alt}" width="${this.image1.width}" height="${this.image1.height}">
        </div>
        <div class="game__option" ${debugStyle(this.debug, this.image2.rightValue)}>
          <img data-name="${this.image2.name}" src="${this.image2.src}" alt="${this.image2.alt}" width="${this.image2.width}" height="${this.image2.height}">
        </div>
        <div class="game__option" ${debugStyle(this.debug, this.image3.rightValue)}>
          <img data-name="${this.image3.name}" src="${this.image3.src}" alt="${this.image3.alt}" width="${this.image3.width}" height="${this.image3.height}">
        </div>
      </form>
    </div>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, () => {
      const option1 = gameContent.elements[this.image1.name].value;
      const option2 = gameContent.elements[this.image2.name].value;
      this.onAnswer({option1, option2});
    });

    const options = this.element.querySelectorAll(`.game__option img`);
    for (const item of options) {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const option = evt.target.dataset.name;
        const result = option === this.rightValue;
        this.onAnswer(result);
      });
    }
  }

  onAnswer() {}
}

export default GameTripleView;
