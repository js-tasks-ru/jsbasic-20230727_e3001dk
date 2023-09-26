import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.createModal();
  }

  createModal() {
    const modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon"/>
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.addCloseHandlers(modal);

    return modal;
  }

  addCloseHandlers(modal) {
    const closeBtn = modal.querySelector('.modal__close');

    closeBtn.onclick = () => {
      this.close();
    };

    document.onkeydown = (evt) => {
      if (evt.code === 'Escape') {
        this.close();
      }
    };
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
  }

  setTitle(title) {
    const modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.append(node);
  }

  close() {
    this.elem.remove();

    document.body.classList.remove('is-modal-open');
    document.onkeydown = null;
  }
}
