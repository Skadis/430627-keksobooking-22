const setDisabledForElements = (elements, state) => {
  elements.forEach((element) => {
    element.disabled = state;
  });
}

const DisableForm = (state) => {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  const filtersForm = document.querySelector('.map__filters');
  const filtersFormSelects = filtersForm.querySelectorAll('.map__filter');
  const filtersFormFieldset = filtersForm.querySelector('.map__features');

  if (state === false) {
    adForm.classList.remove('ad-form--disabled');
    filtersForm.classList.remove('map__filters--disabled');
  } else {
    adForm.classList.add('ad-form--disabled');
    filtersForm.classList.add('map__filters--disabled');
  }

  setDisabledForElements(adFormFieldsets, state);
  setDisabledForElements(filtersFormSelects, state);
  filtersFormFieldset.disabled = state;
}

export { DisableForm }