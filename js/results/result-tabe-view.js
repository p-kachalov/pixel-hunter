import AbstractView from '../abstract-view';

class ResultsView extends AbstractView {
  constructor(isWin, table) {
    super();
    this._isWin = isWin;
    this._table = table;
  }

  get template() {
    return `
      <div class="result">
        <h1>${this._isWin ? `Победа` : `Поражение`}!</h1>
      </div>
    `;
  }

  render() {
    const content = super.render();
    this._table.forEach((item) => {
      content.appendChild(item);
    });

    return content;
  }
}

export default ResultsView;
