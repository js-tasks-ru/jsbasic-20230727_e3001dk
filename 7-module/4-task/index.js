export default class StepSlider {
  constructor(config) {
    this.elem = this.createSlider(config.steps, config.value);
  }

  createSlider(steps, value) {
    const slider = createSliderElement();
    const sliderSteps = createSliderStepsElement();

    const thumb = slider.querySelector('.slider__thumb');

    slider.append(sliderSteps);

    let sliderWidth;
    let segmentWidth;
    let currentStep;

    slider.addEventListener('click', onSliderClick);
    thumb.addEventListener('pointerdown', onThumbPointerDown);

    function createSliderElement() {
      const sliderElement = document.createElement('div');
      sliderElement.classList.add('slider');

      const thumbElement = document.createElement('div');
      thumbElement.classList.add('slider__thumb');

      const valueElement = document.createElement('span');
      valueElement.classList.add('slider__value');
      valueElement.textContent = value;

      const progressElement = document.createElement('div');
      progressElement.classList.add('slider__progress');

      thumbElement.append(valueElement);
      sliderElement.append(thumbElement, progressElement);

      return sliderElement;
    }

    function createSliderStepsElement() {
      const sliderStepsElement = document.createElement('div');
      sliderStepsElement.classList.add('slider__steps');

      const sliderStepsElements = new DocumentFragment();

      for (let i = 0; i < steps; i++) {
        const step = document.createElement('span');
        if (value === i) {
          step.classList.add('slider__step-active');
        }
        sliderStepsElements.append(step);
      }

      sliderStepsElement.append(sliderStepsElements);

      return sliderStepsElement;
    }

    function onThumbPointerDown(evt) {
      evt.preventDefault();

      slider.classList.add('slider_dragging');

      document.addEventListener('pointermove', onThumbPointerMove);
      document.addEventListener('pointerup', onThumbPointerUp);
      thumb.addEventListener('dragstart', onThumbDragsart);

      function onThumbPointerMove(evt) {
        evt.preventDefault();

        runSliderAction(evt);
      }

      function onThumbPointerUp() {
        slider.classList.remove('slider_dragging');

        document.removeEventListener('pointermove', onThumbPointerMove);
        document.removeEventListener('pointerup', onThumbPointerUp);
        thumb.removeEventListener('dragstart', onThumbDragsart);

        updateThumb();
        genChangeEvent();
      }

      function onThumbDragsart(evt) {
        evt.preventDefault();
      }
    }

    function onSliderClick(evt) {
      if (evt.target.closest('.slider__thumb')) {
        return;
      }

      runSliderAction(evt);
    }

    function runSliderAction(evt) {
      sliderWidth = slider.offsetWidth;
      segmentWidth = sliderWidth / (steps - 1);

      currentStep = getCurrentStep();

      updateValue();
      updateStep();

      if (evt.type === 'click') {
        updateThumb();
        genChangeEvent();
      } else {
        testFoo();
      }

      function getCurrentStep() {
        const sliderClickX = evt.pageX - slider.getBoundingClientRect().x;

        if (sliderClickX < 0) {
          return 0;
        }

        if (sliderClickX > sliderWidth) {
          return steps - 1;
        }

        let segmentsWidth = 0;

        while (segmentsWidth < sliderClickX) {
          segmentsWidth += segmentWidth;
        }

        const currentSegment = Math.round(segmentsWidth / segmentWidth);
        const segmentClickX = sliderClickX - (segmentsWidth - segmentWidth);

        return (segmentClickX > segmentWidth / 2) ? currentSegment : currentSegment - 1;
      }

      function updateValue() {
        const value = slider.querySelector('.slider__value');
        value.textContent = currentStep;
      }

      function updateStep() {
        const currentStepElement = sliderSteps.querySelector(`span:nth-child(${currentStep + 1})`);
        const previouseStepElement = sliderSteps.querySelector('.slider__step-active');

        if (!currentStepElement.classList.contains('slider__step-active')) {
          currentStepElement.classList.add('slider__step-active');
          previouseStepElement.classList.remove('slider__step-active');
        }
      }

      function testFoo() {
        const progress = slider.querySelector('.slider__progress');

        let leftPercents;

        const sliderClickX = evt.pageX - slider.getBoundingClientRect().x;

        if (sliderClickX >= 0 && sliderClickX <= sliderWidth) {
          leftPercents = sliderClickX / sliderWidth * 100;
        } else {
          leftPercents = (sliderClickX < 0) ? 0 : 100;
        }

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
      }
    }

    function updateThumb() {
      const progress = slider.querySelector('.slider__progress');

      const leftPercents = currentStep * segmentWidth / sliderWidth * 100;

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    }

    function genChangeEvent() {
      const changeEvent = new CustomEvent('slider-change', {
        bubbles: true,
        detail: currentStep,
      });

      slider.dispatchEvent(changeEvent);
    }

    return slider;
  }
}
