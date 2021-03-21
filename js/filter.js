/* global _:readonly */

import { getData } from './api.js';
import { createErrorAlert } from './util.js';

const ANY = 'any';
const RERENDER_DELAY = 500;

const filterForm = document.querySelector('.map__filters');
const filterHoustingType = filterForm.querySelector('#housing-type');
const filterHoustingPrice = filterForm.querySelector('#housing-price');
const filterHoustingRoom = filterForm.querySelector('#housing-rooms');
const filterHoustingGuest = filterForm.querySelector('#housing-guests');

const filterPrices = {
  low: 10000,
  high: 50000,
}

const priceRange = {
  low: 'low',
  middle: 'middle',
  high: 'high',
}

const filterByTypeHouse = ({offer}, type) => {
  if (type === ANY || offer.type === type) {
    return true;
  }
  return false;
};

const filterByPrice = ({offer}, price) => {
  if ((price === ANY) || (offer.price >= filterPrices.low && offer.price <= filterPrices.high && price === priceRange.middle) || (offer.price < filterPrices.low && price === priceRange.low) || (offer.price > filterPrices.high && price === priceRange.high)) {
    return true;
  }
  return false;
};

const filterByRoom = ({offer}, room) => {
  if (room === ANY || Number(offer.rooms) === Number(room)) {
    return true;
  }
  return false;
};

const filterByGuest = ({offer}, guest) => {
  if (guest === ANY || Number(offer.guests) === Number(guest)) {
    return true;
  }
  return false;
};

const filterByFeatures = ({offer}) => {
  const filterHoustingFeatures = filterForm.querySelectorAll('.map__checkbox:checked');

  return Array.from(filterHoustingFeatures).every((feature) => {
    return offer.features.includes(feature.value);
  });
}

const filterOffers = (removePin, addPin, quantity) => {
  getData(
    (offers) => {
      filterForm.addEventListener('change', _.debounce( () => {
        removePin();

        addPin( 
          offers.slice(0, quantity).filter((offer) => {
            return filterByTypeHouse(offer, filterHoustingType.value) && filterByPrice(offer, filterHoustingPrice.value) && filterByRoom(offer, filterHoustingRoom.value) && filterByGuest(offer, filterHoustingGuest.value) && filterByFeatures(offer);
          }),
        );
      }, RERENDER_DELAY));
    },
    () => createErrorAlert('Ошибка. Не удалось получить данные'),
  );
}

export { filterOffers }
