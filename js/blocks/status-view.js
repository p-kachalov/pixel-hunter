import AbstractView from '../abstract-view';

const HURRY_TIME = 5;

class StatusView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    return `
    <h1 class="game__timer" ${this._state.time <= HURRY_TIME ? `style="animation: blink-animation 1s steps(5, start) infinite"` : ``}>${this._state.time}</h1>
    <div class="game__lives">
      ${new Array(this._state.settings.maxLivesNumber - this._state.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
        .join(``)}
      ${new Array(this._state.lives)
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
