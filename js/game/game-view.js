import AbstractView from '../abstract-view';

class GameView extends AbstractView {
  constructor(header, footer, stats, game) {
    super();
    this._header = header;
    this._footer = footer;
    this._stats = stats;
    this._game = game;
  }

  render() {
    const container = document.createDocumentFragment();
    container.appendChild(this._header);
    container.appendChild(this._game);
    container.appendChild(this._stats);
    container.appendChild(this._footer);
    return container;
  }
}

export default GameView;
