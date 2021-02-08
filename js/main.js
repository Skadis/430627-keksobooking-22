// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random, https://learn.javascript.ru/
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_URL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const QUANTITY_OF_OFFERS = 10;

function getRandomIntegerNumber(min, max) {
  if (min > max) {
    throw new Error('Начальное значение диапазона больше конечного');
  }

  if (max < 0) {
    throw new Error('Конечное значение диапазона не может являться отрицательным числом');
  }

  if (min < 0) {
    throw new Error('Начальное значение диапазона не может являться отрицательным числом');
  }

  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomFloatNumber(min, max, decimalPlaces) {
  if (min > max) {
    throw new Error('Начальное значение диапазона больше конечного');
  }

  if (max < 0) {
    throw new Error('Конечное значение диапазона не может являться отрицательным числом');
  }

  if (min < 0) {
    throw new Error('Начальное значение диапазона не может являться отрицательным числом');
  }

  if (decimalPlaces < 0 || decimalPlaces > 20) {
    throw new Error('Неверно введено количество знаков после запятой');
  }

  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

const createUniqueArray = (array) => {
  let result = [];

  array.forEach(element => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });

  result.sort(() => Math.random() - 0.5).splice(0, getRandomIntegerNumber(0, result.length - 1));

  return result;
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerNumber(0, elements.length - 1)];
}

const createAuthor = () => {

  return {
    avatar: `img/avatars/user0${getRandomIntegerNumber(1, 8)}.png`,
  }
}

const createOffer = () => {

  return {
    title: 'Тут будет заголовок объявления',
    address: `${getRandomFloatNumber(35.65000, 35.70000, 5)}, ${getRandomFloatNumber(139.70000, 139.80000, 5)}`,
    price: getRandomIntegerNumber(0, 1000000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntegerNumber(1, 30),
    guests: getRandomIntegerNumber(1, 100),
    checkin: getRandomArrayElement(TIME),
    checkout: getRandomArrayElement(TIME),
    features: createUniqueArray(FEATURES),
    description: 'Тут будет описание объявления',
    photos: createUniqueArray(PHOTOS_URL),
    location: {
      x: getRandomFloatNumber(35.65000, 35.70000, 5),
      y: getRandomFloatNumber(139.70000, 139.80000, 5),
    },
  }
}

const createNewNearOffer = () => {
  const OFFERS = createOffer();
  const AUTHORS = createAuthor();

  return Object.assign({}, AUTHORS, OFFERS);
}

const createManyNearOffers = (quantityOfOffers) => {
  let nearOffers = new Array (quantityOfOffers).fill(null).map(() => createNewNearOffer());

  return nearOffers;
}

createManyNearOffers(QUANTITY_OF_OFFERS);