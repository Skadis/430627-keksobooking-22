import { getData } from './api.js';
import { createErrorAlert } from './util.js';

const filterForm = document.querySelector('.map__filters');
const filterHoustingType = filterForm.querySelector('#housing-type');
const filterHoustingPrice = filterForm.querySelector('#housing-price');
const filterHoustingRoom = filterForm.querySelector('#housing-rooms');
const filterHoustingGuest = filterForm.querySelector('#housing-guests');

const filterPrices = {
  low: 10000,
  high: 50000,
}

const filterByTypeHouse = ({offer}, type) => {
  if (type === 'any' || offer.type === type) {
    return true;
  }
  return false;
};

const filterByPrice = ({offer}, price) => {
  if ((price === 'any') || (offer.price >= filterPrices.low && offer.price <= filterPrices.high && price === 'middle') || (offer.price < filterPrices.low && price === 'low') || (offer.price > filterPrices.high && price === 'high')) {
    return true;
  }
  return false;
};

const filterByRoom = ({offer}, room) => {
  if (room === 'any' || Number(offer.rooms) === Number(room)) {
    return true;
  }
  return false;
};

const filterByGuest = ({offer}, guest) => {
  if (guest === 'any' || Number(offer.guests) === Number(guest)) {
    return true;
  }
  return false;
};

const filterOffers = (removePin, addPin, quantity) => {
  getData(
    (offers) => {
      filterForm.addEventListener('change', () => {
        removePin();

        addPin(
          offers.slice(0, quantity).filter((offer) => {
            return filterByTypeHouse(offer, filterHoustingType.value) && filterByPrice(offer, filterHoustingPrice.value) && filterByRoom(offer, filterHoustingRoom.value) && filterByGuest(offer, filterHoustingGuest.value);
          }),
        );
      })
    },
    () => createErrorAlert('Ошибка. Не удалось получить данные'),
  );
}

export { filterOffers }
