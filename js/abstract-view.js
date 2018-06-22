
class AbstractView {
  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this._element;
  }

  render() {
    const container = document.createElement(`template`);
    container.innerHTML = this.template;
    return container.content;
  }

  bind() {}
}

export default AbstractView;
