import AbstractView from '../abstract-view';

class ConfirmView extends AbstractView {
  constructor(status) {
    super();
    this.status = status;
  }
  get template() {
    return `
    <section class="modal-confirm modal-confirm__wrap">
      <form class="modal-confirm__inner">
        <button class="modal-confirm__close" type="button">Закрыть</button>
        <h2 class="modal-confirm__title">Подтверждение</h2>
        <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal-confirm__btn-wrap">
          <button class="modal-confirm__btn modal-confirm__btn_ok">Ок</button>
          <button class="modal-confirm__btn modal-confirm__btn_cancel">Отмена</button>
        </div>
      </form>
    </section>
    `;
  }

  bind() {
    const okButton = this.element.querySelector(`.modal-confirm__btn_ok`);
    okButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onOkClick();
    });

    const cancelButton = this.element.querySelector(`.modal-confirm__btn_cancel`);
    cancelButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCancelClick();
    });

    const closeButton = this.element.querySelector(`.modal-confirm__close`);
    closeButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCloseClick();
    });

  }

  onOkClick() {
  }

  onCancelClick() {
  }

  onCloseClick() {
  }
}

export default ConfirmView;
