import AbstractView from './abstract-view';

class GreetingView extends AbstractView {
  constructor(footer) {
    super();
    this._footer = footer;
  }

  get template() {
    return `
    <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
      <h1 class="greeting__asterisk">*</h1>
      <div class="greeting__challenge">
        <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
        <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
          Задача кажется тривиальной, но не думай, что все так просто.<br>
          Фотореализм обманчив и коварен.<br>
          Помни, главное — смотреть очень внимательно.</p>
      </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>
    `;
  }

  render() {
    const container = document.createElement(`template`);
    const content = AbstractView.renderTemplate(this.template);
    container.content.appendChild(content);
    container.content.appendChild(this._footer);

    return container.content;
  }

  bind() {
    const link = this.element.querySelector(`.greeting__continue`);
    link.addEventListener(`click`, () => {
      this.callback();
    });
  }

  callback() {
  }
}

export default GreetingView;
