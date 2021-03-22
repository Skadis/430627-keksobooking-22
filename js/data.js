import { getRandomIntegerNumber, getRandomFloatNumber, createUniqueArray, getRandomArrayElement, generatePhotoUrl } from './util.js'

const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const offerSettings = {
  demicialPlacesCount: 5,
  x: {
    min: 35.65000,
    max: 35.70000,
  },
  y: {
    min: 139.70000,
    max: 139.80000,
  },
  avatar: {
    min: 1,
    max: 8,
  },
  price: {
    min: 0,
    max: 1000000,
  },
  rooms: {
    min: 1,
    max: 30,
  },
  guests: {
    min: 1,
    max: 30,
  },
  photos: {
    min: 1,
    max: 3,
  },
}

const createNearOffer = () => {
  const locationX = getRandomFloatNumber(offerSettings.x.min, offerSettings.x.max, offerSettings.demicialPlacesCount);
  const locationY = getRandomFloatNumber(offerSettings.y.min, offerSettings.y.max, offerSettings.demicialPlacesCount);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomIntegerNumber(offerSettings.avatar.min, offerSettings.avatar.max)}.png`,
    },

    offer: {
      title: 'Тут будет заголовок объявления',
      address: `${locationX}, ${locationY}`,
      price: getRandomIntegerNumber(offerSettings.price.min, offerSettings.price.max),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntegerNumber(offerSettings.rooms.min, offerSettings.rooms.max),
      guests: getRandomIntegerNumber(offerSettings.guests.min, offerSettings.guests.max),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: createUniqueArray(FEATURES),
      description: 'Тут будет описание объявления',
      photos: createUniqueArray(generatePhotoUrl(offerSettings.photos.min, offerSettings.photos.max)),
      location: {
        x: locationX,
        y: locationY,
      },
    },
  }
}

const createManyNearOffers = (quantityOfOffers) => {
  const nearOffers = new Array (quantityOfOffers).fill(null).map(() => createNearOffer());

  return nearOffers;
}

export { createManyNearOffers };
