import { showPopupAlert } from './popup.js';
import { map } from './map.js';
import { sendData } from './api.js';
import { preview } from './preview.js'

const form = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const houstingType = form.querySelector('#type');
const houstingPrice = form.querySelector('#price');
const checkinSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');
const roomsNumber = form.querySelector('#room_number');
const capacity =  form.querySelector('#capacity');
const fileChooserAvatar = form.querySelector('#avatar');
const previewAvatar = form.querySelector('.ad-form-header__preview img');
const fileChooserImages = form.querySelector('#images');
const previewImages = form.querySelector('.ad-form__photo');

const prices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const allowedRooms = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const transformTypeToPrice = (type) => {
  switch(type) {
    case 'bungalow':
      type = prices.bungalow
      break;
    case 'flat':
      type = prices.flat
      break;
    case 'house':
      type = prices.house
      break;
    case 'palace':
      type = prices.palace
      break;
  }

  return type;
}

const resetForm = () => {
  form.reset();
  filterForm.reset();
  map.returnMainPin();
  map.setSimplePin();
  preview.resetPreview(previewAvatar);
  preview.resetPreview(previewImages);
}

const setPrice = () => {
  houstingPrice.placeholder = transformTypeToPrice(houstingType.value);
  houstingPrice.min = transformTypeToPrice(houstingType.value);
}

const changeCapacityOptions = (guestNumber) => {
  const capacityOptions = capacity.querySelectorAll('option');

  capacityOptions.forEach(element => {
    element.disabled = true;
  });

  allowedRooms[guestNumber].forEach(element => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === element) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showPopupAlert('Данные отправлены', 'success');
        resetForm();
      },
      () => showPopupAlert('Не удалось отправить данные. Попробуйте ещё раз', 'error'),
      new FormData(evt.target),
    )
  });
}

const setFormReset = () => {
  const buttonReset = form.querySelector('.ad-form__reset');

  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  })
};

houstingType.addEventListener('change', () => {
  setPrice();
});

checkinSelect.addEventListener('change', () => {
  checkoutSelect.value = checkinSelect.value;
});

checkoutSelect.addEventListener('change', () => {
  checkinSelect.value = checkoutSelect.value;
});

roomsNumber.addEventListener('change', () => {
  changeCapacityOptions(roomsNumber.value);
});

fileChooserAvatar.addEventListener('change', () => {
  preview.setImageInPreview(event.target, previewAvatar);
});

fileChooserImages.addEventListener('change', () => {
  preview.setImageInPreview(event.target, previewImages);
});

setPrice();
changeCapacityOptions(roomsNumber.value);
setFormSubmit();
setFormReset();
