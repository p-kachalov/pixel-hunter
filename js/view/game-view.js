import AbstractView from './abstract-view';

class GameView extends AbstractView {
  constructor(header, footer, stats, game) {
    super();
    this._header = header;
    this._footer = footer;
    this._stats = stats;
    this._game = game;
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
