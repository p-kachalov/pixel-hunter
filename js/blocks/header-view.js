import AbstractView from '../abstract-view';

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

  render() {
    const content = AbstractView.renderTemplate(this.template);
    if (this._status) {
      content.appendChild(this._status);
    }
    return content;
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
