/* global L:readonly */

import { DisableForm } from './disable-form.js';
import { renderCard } from './render-card.js';
import { createManyNearOffers } from './data.js';

const START_LAT = 35.6729;
const START_LNG = 139.7564;
const QUANTITY_OF_OFFERS = 10;
const addressField =  document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const simplePinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setAddress = (x, y) => {
  addressField.value = `${ x }, ${ y }`;
}

const addSimplePin = (map, locationX, locationY, element) => {

  const simplePinMarker = L.marker(
    {
      lat: locationX,
      lng: locationY,
    },
    {
      icon: simplePinIcon,
      keepInView: true,
    },
  );

  simplePinMarker
    .addTo(map)
    .bindPopup(renderCard(element));
}

const initMap = () => {
  const nearOffers = createManyNearOffers(QUANTITY_OF_OFFERS);

  const map = L.map('map-canvas')
    .on('load', () => {
      DisableForm(false);
      setAddress(START_LAT, START_LNG);
    })

    .setView({
      lat: START_LAT,
      lng: START_LNG,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const { lat, lng } = evt.target.getLatLng()

    setAddress(lat.toFixed(5), lng.toFixed(5));
  });

  nearOffers.forEach(element => {
    const {x, y} = element.offer.location;

    addSimplePin(map, x, y, element);
  });
}

export { initMap };