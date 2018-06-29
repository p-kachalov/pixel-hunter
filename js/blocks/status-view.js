import AbstractView from '../abstract-view';

class StatusView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
    <h1 class="game__timer" ${this.state.time <= 5 ? `style="animation: blink-animation 1s steps(5, start) infinite"` : ``}>${this.state.time}</h1>
    <div class="game__lives">
      ${new Array(this.state.settings.maxLivesNumber - this.state.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
        .join(``)}
      ${new Array(this.state.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
        .join(``)}
    </div>
    <style>
      @keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }
    </style>
    `;
  }
}

export default StatusView;
