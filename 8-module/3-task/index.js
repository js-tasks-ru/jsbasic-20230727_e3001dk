export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

