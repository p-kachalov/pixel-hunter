import AbstractView from './abstract-view';

class GameTripleView extends AbstractView {
  constructor(data) {
    super();
    this.question = data.question;
    this.image1 = data.image1;
    this.image2 = data.image2;
    this.image3 = data.image3;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content game__content--triple">
        <div class="game__option" data-name="${this.image1.name}">
          <img src="${this.image1.src}" alt="${this.image1.alt}" width="${this.image1.width}" height="${this.image1.height}">
        </div>
        <div class="game__option" data-name="${this.image2.name}">
          <img src="${this.image2.src}" alt="${this.image2.alt}" width="${this.image2.width}" height="${this.image2.height}">
        </div>
        <div class="game__option" data-name="${this.image3.name}">
          <img src="${this.image3.src}" alt="${this.image3.alt}" width="${this.image3.width}" height="${this.image3.height}">
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

    const options = this.element.querySelectorAll(`.game__option`);
    for (const item of options) {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const option = evt.target.dataset.name;
        this.onAnswer({option});
      });
    }
  }

  onAnswer() {}
}

export default GameTripleView;
