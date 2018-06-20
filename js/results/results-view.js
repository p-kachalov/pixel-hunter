import AbstractView from '../abstract-view';

class ResultView extends AbstractView {
  constructor(header, footer, resultTable) {
    super();
    this._header = header;
    this._footer = footer;
    this._table = resultTable;
  }

  get template() {
    return `
      <div class="result">
        <h1>Победа!</h1>
      </div>
    `;
  }

  render() {
    const container = document.createElement(`template`);
    const content = AbstractView.renderTemplate(this.template);
    this._table.foreach((item) => {
      content.appendChild(item);
    });

    container.content.appendChild(this._header);
    container.content.appendChild(content);
    container.content.appendChild(this._footer);
    return container.content;
  }
}

export default ResultView;
