import AbstractView from './abstract-view';

class GameView extends AbstractView {
  constructor(header, footer, stats, game) {
    super();
    this._header = header;
    this._footer = footer;
    this._stats = stats;
    this._game = game;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${GameAttributes[this._gameType].question}</p>
      <form class="game__content  ${GameAttributes[this._gameType].containerClass}"></form>
    </div>
    `;
  }

  render() {
    const container = document.createElement(`template`);
    container.content.appendChild(this._header);
    container.content.appendChild(this._game);
    container.content.appendChild(this._stats);
    container.content.appendChild(this._footer);
    return container.content;
  }
}

export default GameView;
