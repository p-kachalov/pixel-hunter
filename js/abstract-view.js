
class AbstractView {
  get template() {}

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this._element;
  }

  static renderTemplate(template) {
    const element = document.createElement(`template`);
    element.innerHTML = template;
    return element.content;
  }

  render() {
    return AbstractView.renderTemplate(this.template);
  }

  bind() {}
}

export default AbstractView;
