const houstingType = document.querySelector('#type');
const houstingPrice = document.querySelector('#price');
const checkinSelect = document.querySelector('#timein');
const checkoutSelect = document.querySelector('#timeout');

const transformTypeToPrice = (type) => {
  switch(type) {
    case 'bungalow':
      type = 0
      break;
    case 'flat':
      type = 1000
      break;
    case 'house':
      type = 5000
      break;
    case 'palace':
      type = 10000
      break;
  }

  return type;
}

const setPrice = () => {
  houstingPrice.placeholder = transformTypeToPrice(houstingType.value);
  houstingPrice.min = transformTypeToPrice(houstingType.value);
}

setPrice();

houstingType.addEventListener('change', function () {
  setPrice();
});

checkinSelect.addEventListener('change', function () {
  checkoutSelect.value = checkinSelect.value;
});

checkoutSelect.addEventListener('change', function() {
  checkinSelect.value = checkoutSelect.value;
});
