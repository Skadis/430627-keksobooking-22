import { getRandomIntegerNumber, getRandomFloatNumber, createUniqueArray, getRandomArrayElement, generatePhotoUrl } from './util.js'

const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];



const createNearOffer = () => {

  return {
    author: {
      avatar: `img/avatars/user0${getRandomIntegerNumber(1, 8)}.png`,
    },

    offer: {
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
      photos: createUniqueArray(generatePhotoUrl(1, 3)),
      location: {
        x: getRandomFloatNumber(35.65000, 35.70000, 5),
        y: getRandomFloatNumber(139.70000, 139.80000, 5),
      },
    },
  }
}

const createManyNearOffers = (quantityOfOffers) => {
  const nearOffers = new Array (quantityOfOffers).fill(null).map(() => createNearOffer());

  return nearOffers;
}

export { createManyNearOffers };