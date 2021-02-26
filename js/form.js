const form = document.querySelector('.ad-form');
const houstingType = form.querySelector('#type');
const houstingPrice = form.querySelector('#price');
const checkinSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const bungalowPrice = 0;
const flatPrice = 1000;
const housePrice = 5000;
const palacePrice = 10000;

const transformTypeToPrice = (type) => {
  switch(type) {
    case 'bungalow':
      type = bungalowPrice
      break;
    case 'flat':
      type = flatPrice
      break;
    case 'house':
      type = housePrice
      break;
    case 'palace':
      type = palacePrice
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
