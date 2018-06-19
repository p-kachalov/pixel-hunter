import AbstractView from './abstract-view';

class HeaderView extends AbstractView {
  constructor(status) {
    super();
    this._status = status;
  }
  get template() {
    return `
    <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>
    `;
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    if (this._status) {
      this.element.appendChild(this._status);
    }
    this.bind();
    return this._element;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onBackClick();
    });
  }

  onBackClick() {
  }
}

export default HeaderView;
