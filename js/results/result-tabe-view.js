import AbstractView from '../abstract-view';

class ResultsView extends AbstractView {
  constructor(isWin, table) {
    super();
    this.isWin = isWin;
    this.table = table;
  }

  get template() {
    return `
      <div class="result">
        <h1>${this.isWin ? `Победа` : `Поражение`}!</h1>
      </div>
    `;
  }

  render() {
    const content = super.render();
    this.table.forEach((item) => {
      content.appendChild(item);
    });
    return content;
  }
}

export default ResultsView;
