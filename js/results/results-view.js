import AbstractView from '../abstract-view';

class ResultsView extends AbstractView {
  constructor(header, footer, resultTable) {
    super();
    this.header = header;
    this.footer = footer;
    this.table = resultTable;
  }

  get template() {
    return `
      <div class="result">
        <h1>Победа!</h1>
      </div>
    `;
  }

  render() {
    const content = super.render();
    const container = document.createElement(`template`);
    this.table.forEach((item) => {
      content.appendChild(item);
    });

    container.content.appendChild(this.header);
    container.content.appendChild(content);
    container.content.appendChild(this.footer);
    return container.content;
  }
}

export default ResultsView;
