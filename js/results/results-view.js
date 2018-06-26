import AbstractView from '../abstract-view';

class ResultsView extends AbstractView {
  constructor(header, footer, table) {
    super();
    this.header = header;
    this.footer = footer;
    this.table = table;
  }

  render() {
    const container = document.createDocumentFragment();
    container.appendChild(this.header);
    container.appendChild(this.table);
    container.appendChild(this.footer);
    return container;
  }
}

export default ResultsView;
