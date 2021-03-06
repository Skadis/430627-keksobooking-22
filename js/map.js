/* global L:readonly */

import { disableForm } from './disable-form.js';
import { renderCard } from './render-card.js';
import { getData } from './api.js';
import { createErrorAlert } from './util.js';
import { filterOffers } from './filter.js';

const QUANTITY_OF_OFFERS = 10;
const DECIMAL_PLACES_COUNT = 5;
const MAP_IMAGES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAP_ZOOM = 10;
const mapCanvas = L.map('map-canvas');
const addressField =  document.querySelector('#address');
const simplePinLayer = L.layerGroup().addTo(mapCanvas);

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

const setSimplePin = () => {
  getData(
    (offers) => {
      addDataToMap(offers);
    },
    () => createErrorAlert('Ошибка. Не удалось получить данные'),
  );
}

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
    .addTo(simplePinLayer)
    .bindPopup(renderCard(element));
}

const removeSimplePin = () => {
  simplePinLayer.clearLayers();
};

const addDataToMap = (offers) => {
  offers.slice(0, QUANTITY_OF_OFFERS).forEach(element => {
    const {lat, lng} = element.location;

    addSimplePin(lat, lng, element);
  });
}

const addAllDataToMap = (offers) => {
  offers.forEach(element => {
    const {lat, lng} = element.location;

    addSimplePin(lat, lng, element);
  });
}

const initMap = () => {
  mapCanvas.on('load', () => {
    disableForm(false);
    setAddress(startCoordinates.lat, startCoordinates.lng);
  })
    .setView({
      lat: startCoordinates.lat,
      lng: startCoordinates.lng,
    }, MAP_ZOOM);

  L.tileLayer(
    MAP_IMAGES_URL,
    {
      attribution: MAP_ATTRIBUTION,
    },
  ).addTo(mapCanvas);

  mainPinMarker.addTo(mapCanvas);

  mainPinMarker.on('move', (evt) => {
    const { lat, lng } = evt.target.getLatLng()

    setAddress(lat.toFixed(DECIMAL_PLACES_COUNT), lng.toFixed(DECIMAL_PLACES_COUNT));
  });

  setSimplePin();

  filterOffers(removeSimplePin, addAllDataToMap, QUANTITY_OF_OFFERS);
}

export { initMap, returnMainPin,  setSimplePin };
