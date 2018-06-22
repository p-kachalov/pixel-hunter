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
    const container = document.createElement(`template`);
    container.content.appendChild(this.header);
    container.content.appendChild(this.game);
    container.content.appendChild(this.stats);
    container.content.appendChild(this.footer);
    return container.content;
  }
}

export default GameView;
