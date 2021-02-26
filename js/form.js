const form = document.querySelector('.ad-form');
const houstingType = form.querySelector('#type');
const houstingPrice = form.querySelector('#price');
const checkinSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const prices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

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

const setPrice = () => {
  houstingPrice.placeholder = transformTypeToPrice(houstingType.value);
  houstingPrice.min = transformTypeToPrice(houstingType.value);
}

houstingType.addEventListener('change', function () {
  setPrice();
});

checkinSelect.addEventListener('change', function () {
  checkoutSelect.value = checkinSelect.value;
});

checkoutSelect.addEventListener('change', function() {
  checkinSelect.value = checkoutSelect.value;
});

setPrice();
