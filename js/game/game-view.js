import AbstractView from '../abstract-view';

class GameView extends AbstractView {
  constructor(header, footer, stats, game) {
    super();
    this.header = header;
    this.footer = footer;
    this.stats = stats;
    this.game = game;
  }

  render() {
    const container = document.createElement(`div`);
    container.appendChild(this.header);
    container.appendChild(this.game);
    container.appendChild(this.stats);
    container.appendChild(this.footer);
    return container;
  }
}

export default GameView;
