import AbstractView from './abstract-view';

class GameDoubleView extends AbstractView {
  constructor(data) {
    super();
    this.question = data.question;
    this.image1 = data.image1;
    this.image2 = data.image2;
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
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="${this.image1.name}" type="radio" value="paint" required>
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this.image2.src}" alt="${this.image2.alt}" width="${this.image2.width}" height="${this.image2.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this.image2.name}" type="radio" value="photo" required>
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="${this.image2.name}" type="radio" value="paint" required>
            <span>Рисунок</span>
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
      const option1 = gameContent.elements[this.image1.name].value;
      const option2 = gameContent.elements[this.image2.name].value;
      this.onAnswer({option1, option2});
    });
  }

  onAnswer() {}
}

export default GameDoubleView;
