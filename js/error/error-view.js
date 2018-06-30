import AbstractView from '../abstract-view';

class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this._error = error;
  }

  get template() {
    return `
    <section class="modal-error modal-error__wrap">
      <div class="modal-error__inner">
        <h2 class="modal-error__title">Произошла ошибка!</h2>
        <p class="modal-error__text">Статус: ${this._error}. Пожалуйста, перезагрузите страницу.</p>
      </div>
    </section>
    `;
  }
}

export default ErrorView;
