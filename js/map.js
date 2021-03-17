/* global L:readonly */

import { DisableForm } from './disable-form.js';
import { renderCard } from './render-card.js';
import { getData } from './api.js';
import { createErrorAlert } from './util.js';

const QUANTITY_OF_OFFERS = 10;
const addressField =  document.querySelector('#address');

const startCoordinates = {
  lat: 35.6729,
  lng: 139.7564,
};

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
    lat: startCoordinates.lat,
    lng: startCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setAddress = (x, y) => {
  addressField.value = `${ x }, ${ y }`;
}

const returnMainPin = () => {
  mainPinMarker.setLatLng(L.latLng(startCoordinates.lat, startCoordinates.lng));
  setAddress(startCoordinates.lat, startCoordinates.lng);
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

  const map = L.map('map-canvas')
    .on('load', () => {
      DisableForm(false);
      setAddress(startCoordinates.lat, startCoordinates.lng);
    })

    .setView({
      lat: startCoordinates.lat,
      lng: startCoordinates.lng,
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

  getData(
    (offers) => {
      offers.slice(0, QUANTITY_OF_OFFERS).forEach(element => {
        const {lat, lng} = element.location;

        addSimplePin(map, lat, lng, element);
      });
    },
    () => createErrorAlert('Ошибка. Не удалось получить данные'),
  );
}

export { initMap, returnMainPin };
