import AbstractView from '../abstract-view';

class GameSingleView extends AbstractView {
  constructor(data) {
    super();
    this.question = data.text;
    this.image = data.image;
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
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint game__answer--wide">
            <input name="${this.image.name}" type="radio" value="paint" required>
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
      const option = gameContent.elements[this.image.name].value;
      this.onAnswer({option});
    });
  }

  onAnswer() {}
}

export default GameSingleView;
