import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.createProductGrid();
  }

  createProductGrid() {
    const productGrid = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.inner = productGrid.querySelector('.products-grid__inner');

    this.products.forEach(product => this.inner.append(new ProductCard(product).elem));

    this.elem = productGrid;
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const filteredProducts = this.products.filter(product => {

      for (const key in this.filters) {
        const value = this.filters[key];

        if (key === 'noNuts') {
          if (value && product.nuts) {
            return false;
          }
        }

        if (key === 'vegeterianOnly') {
          if (value && !product.vegeterian) {
            return false;
          }
        }

        if (key === 'maxSpiciness') {
          if (value < product.spiciness) {
            return false;
          }
        }

        if (key === 'category') {
          if (value && value !== product.category) {
            return false;
          }
        }
      }

      return true;
    });

    this.inner.innerHTML = '';
    filteredProducts.forEach(product => this.inner.append(new ProductCard(product).elem));
  }
}
