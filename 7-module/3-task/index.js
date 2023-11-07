export default class StepSlider {
  constructor(config) {
    this.elem = this.createSlider(config.steps, config.value);
  }

  createSlider(steps, value) {
    const slider = createSliderElement();
    const sliderSteps = createSliderStepsElement();

    slider.append(sliderSteps);

    slider.addEventListener('click', onSliderClick);

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

    function onSliderClick(evt) {
      const sliderWidth = slider.offsetWidth;
      const segmentWidth = sliderWidth / (steps - 1);

      const currentStep = getCurrentStep();

      updateValue();
      updateStep();
      updateThumb();

      genChangeEvent();

      function getCurrentStep() {
        const sliderClickX = evt.pageX - slider.getBoundingClientRect().x;

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

      function updateThumb() {
        const thumb = slider.querySelector('.slider__thumb');
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
    }

    return slider;
  }
}
