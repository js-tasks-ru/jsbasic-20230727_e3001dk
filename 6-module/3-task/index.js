import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.createCarousel();
  }

  createArrows() {
    const rightArrow = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    `);
    const leftArrow = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `);
    return [rightArrow, leftArrow];
  }

  createCarouselSlides() {
    const carouselInner = createElement(`
      <div class="carousel__inner"></div>
    `);
    const slides = this.slides.map(({name, price, image, id}) => createElement(`
      <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `));
    carouselInner.append(...slides);
    return carouselInner;
  }

  runCarousel(carousel) {
    const carouselInner = carousel.querySelector('.carousel__inner');
    const carouselSlides = carousel.querySelectorAll('.carousel__slide');
    const leftArrow = carousel.querySelector('.carousel__arrow_left');
    const rightArrow = carousel.querySelector('.carousel__arrow_right');

    carouselInner.style.transform = `translateX(0px)`;
    leftArrow.style.display = 'none';

    carousel.addEventListener('click', (evt) => {
      if (evt.target.closest('.carousel__arrow')) {
        let translateNum = parseNum(carouselInner.style.transform);

        if (evt.target.closest('.carousel__arrow_left')) {
          translateNum += carouselInner.offsetWidth;
        }

        if (evt.target.closest('.carousel__arrow_right')) {
          translateNum -= carouselInner.offsetWidth;
        }

        carouselInner.style.transform = `translateX(${translateNum}px)`;
        checkArrowsVisibility(translateNum);
      }
    });

    function parseNum (value) {
      const num = [...value].filter((el) => {
        if (isFinite(el) || el === '-') {
          return el;
        }
      });
      return +num.join('');
    }

    function checkArrowsVisibility (value) {
      if (value === 0) {
        leftArrow.style.display = 'none';
      } else {
        leftArrow.removeAttribute('style');
      }

      if (value === -(carouselSlides.length - 1) * carouselInner.offsetWidth) {
        rightArrow.style.display = 'none';
      } else {
        rightArrow.removeAttribute('style');
      }
    }
  }

  addCarouselButtonHandler(carousel) {
    const onCarouselButtonClick = (evt) => {
      if (evt.target.closest('.carousel__button')) {
        const currentSlideId = evt.target.closest('.carousel__slide').dataset.id;
        const productАdd = new CustomEvent("product-add", {
          detail: currentSlideId,
          bubbles: true,
        });
        console.log(productАdd);
        this.elem.dispatchEvent(productАdd);
      }
    };

    carousel.addEventListener('click', onCarouselButtonClick);
  }

  createCarousel() {
    const carousel = createElement(`
      <div class="carousel"></div>
    `);
    carousel.append(...this.createArrows());
    carousel.append(this.createCarouselSlides());

    this.runCarousel(carousel);

    this.addCarouselButtonHandler(carousel);

    return carousel;
  }
}
