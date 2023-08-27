import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.productAdd = new CustomEvent('product-add', {
      detail: this.product.id,
      bubbles: true,
    });
    this.elem = this.createProductCard();
  }

  addCardButtonHandler(productCard) {
    const cardButton = productCard.querySelector('.card__button');

    cardButton.addEventListener('click', (evt) => {
      evt.target.closest('.card').dispatchEvent(this.productAdd);
    });
  }

  createProductCard() {
    const productCard = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
          </div>
      </div>
    `);

    this.addCardButtonHandler(productCard);

    return productCard;
  }
}
