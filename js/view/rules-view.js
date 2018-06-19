import AbstractView from './abstract-view';

class RulesView extends AbstractView {
  get template() {
    return `
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    `;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    const container = document.createElement(`template`);
    const content = this.render();
    const footer = this._footer;
    const header = this._header;
    container.content.appendChild(header);
    container.content.appendChild(content);
    container.content.appendChild(footer);

    this._element = container.content;
    this.bind();
    return this._element;
  }

  set header(header) {
    this._header = header;
  }

  set footer(footer) {
    this._footer = footer;
  }

  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const input = this.element.querySelector(`.rules__input`);
    const button = this.element.querySelector(`.rules__button`);

    input.addEventListener(`input`, (evt) => {
      button.disabled = evt.target.value.length === 0;
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onSubmit({userName: input.value});
    });
  }

  onSubmit() {}
}

export default RulesView;
