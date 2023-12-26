import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    const index = this.cartItems.findIndex(el => el.product.id === product.id);

    let item;

    if (index === -1) {
      item = {product: product, count: 1};
      this.cartItems.push(item);
    } else {
      item = this.cartItems[index];
      ++item.count;
    }

    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex(el => el.product.id === productId);
    const item = this.cartItems[index];

    if (amount === 1) {
      ++item.count;
    } else {
      --item.count;
    }

    if (!item.count) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(item);
  }

  isEmpty() {
    return !Boolean(this.cartItems.length);
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.count * item.product.price, 0);
  }

  renderProduct({product, count}) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();

    this.body = createElement('<div></div>');
    this.form = this.renderOrderForm();

    this.cartItems.forEach(el => this.body.append(this.renderProduct(el)));
    this.body.append(this.form);

    this.modal.setTitle('Your order');
    this.modal.setBody(this.body);

    this.body.addEventListener('click', event => {
      const button = event.target.closest('.cart-counter__button');

      let productId;
      let amount = 1;

      if (button) {
        productId = event.target.closest('.cart-product').dataset.productId;

        if (button.matches('.cart-counter__button_minus')) {
          amount = -1;
        }

        this.updateProductCount(productId, amount);
      }
    });

    this.form.addEventListener('submit', event => this.onSubmit(event));

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      const productId = cartItem.product.id;

      const productCount = this.body.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      const productPrice = this.body.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      const infoPrice = this.body.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (!cartItem.count) {
        this.body.querySelector(`[data-product-id="${productId}"]`).remove();
      }

      if (this.isEmpty()) {
        this.modal.close();
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const button = this.form.querySelector('button[type="submit"]');
    button.classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(this.form),
    })
      .then(response => {
        if (response.ok) {
          this.modal.setTitle('Success!');
          this.cartItems.length = 0;
          this.body.innerHTML = '<div class="modal__body-inner"><p>Order successful! Your order is being cooked :) <br>We’ll notify you about delivery time shortly.<br><img src="/assets/images/delivery.gif"></p></div>';
        }
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

