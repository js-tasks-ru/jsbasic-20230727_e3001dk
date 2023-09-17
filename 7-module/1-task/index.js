import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createRibbonMenu();
  }

  createRibbonInner() {
    let ribbonItems = '';

    this.categories.forEach(({id, name}) => {
      let itemClass = 'ribbon__item';

      if (!id) {
        itemClass += ' ribbon__item_active';
      }

      ribbonItems += `<a href="#" class="${itemClass}" data-id="${id}">${name}</a>`;
    });

    return createElement(`
      <nav class="ribbon__inner">
        ${ribbonItems}
      </nav>
      `);
  }

  createLeftArrow() {
    return createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);
  }

  createRightArrow() {
    return createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);
  }

  runScrollingWork(ribbonMenu) {
    const arrowLeft = ribbonMenu.querySelector('.ribbon__arrow_left');
    const arrowRight = ribbonMenu.querySelector('.ribbon__arrow_right');
    const ribbonInner = ribbonMenu.querySelector('.ribbon__inner');

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      const scrollWidth = ribbonInner.scrollWidth;
      const scrollLeft = ribbonInner.scrollLeft;
      const clientWidth = ribbonInner.clientWidth;

      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft < 1) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }

  runActiveCategoryWork(ribbonMenu) {
    const ribbonInner = ribbonMenu.querySelector('.ribbon__inner');

    ribbonInner.addEventListener('click', (evt) => {
      evt.preventDefault();

      const currentItem = ribbonInner.querySelector('.ribbon__item_active');
      const targetItem = evt.target.closest('.ribbon__item');

      if (targetItem === currentItem) {
        return;
      }

      targetItem.classList.toggle('ribbon__item_active');
      currentItem.classList.toggle('ribbon__item_active');

      const ribbonSelectEvent = new CustomEvent('ribbon-select', {
        bubbles: true,
        detail: targetItem.dataset.id,
      });

      ribbonMenu.dispatchEvent(ribbonSelectEvent);
    });
  }

  createRibbonMenu() {
    const ribbonMenu = createElement(`<div class="ribbon"></div>`);

    ribbonMenu.append(this.createLeftArrow());
    ribbonMenu.append(this.createRibbonInner());
    ribbonMenu.append(this.createRightArrow());

    this.runScrollingWork(ribbonMenu);
    this.runActiveCategoryWork(ribbonMenu);

    return ribbonMenu;
  }
}
