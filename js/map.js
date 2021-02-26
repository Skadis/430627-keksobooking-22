import { DisableForm } from './disable-form.js';
import { renderCard } from './render-card.js';
import { createManyNearOffers } from './data.js';

const startX = 35.6729;
const startY = 139.7564;
const QUANTITY_OF_OFFERS = 10;

const nearOffers = createManyNearOffers(QUANTITY_OF_OFFERS);

DisableForm(true);

/* global L:readonly */

const map = L.map('map-canvas')
  .on('load', () => {
    DisableForm(false);
  })

  .setView({
    lat: startX,
    lng: startY,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: startX,
    lng: startY,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const addressField =  document.querySelector('#address');

addressField.value = `${ startX }, ${ startY }`;

mainPinMarker.on('moveend', (evt) => {

  const { lat, lng } = evt.target.getLatLng()

  addressField.value = `${ lat.toFixed(5) }, ${ lng.toFixed(5) }`;

});

const simplePinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const addSimplePin = (locationX, locationY, element) => {

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

nearOffers.forEach(element => {
  const {x, y} = element.offer.location;

  addSimplePin(x, y, element);
});