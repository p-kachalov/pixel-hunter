import AbstractView from '../abstract-view';

class ResultsView extends AbstractView {
  constructor(header, footer, table) {
    super();
    this._header = header;
    this._footer = footer;
    this._table = table;
  }

  render() {
    const container = document.createDocumentFragment();
    container.appendChild(this._header);
    container.appendChild(this._table);
    container.appendChild(this._footer);
    return container;
  }
}

export default ResultsView;
