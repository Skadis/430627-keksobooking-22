const hideEmptyBlock = (element, block, parent) => {
  if (element === '' || element === null || element === []) parent.removeChild(parent.querySelector(block));
}

const transformType = (type) => {
  switch(type) {
    case 'flat': type = 'Квартира'
      break;
    case 'bungalow': type = 'Бунгало'
      break;
    case 'house': type = 'Дом'
      break;
    case 'palace': type = 'Дворец'
      break;
  }

  return type;
} 

const insertDataInCard = ({ author, offer }) => {

  const parentBlock = document.querySelector('.map__canvas');
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  hideEmptyBlock(author.avatar, '.popup__avatar', cardElement);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  hideEmptyBlock(offer.title, '.popup__title', cardElement);
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  hideEmptyBlock(offer.address, '.popup__text--address', cardElement);
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  hideEmptyBlock(offer.price, '.popup__text--price', cardElement);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  hideEmptyBlock(offer.rooms, '.popup__text--capacity', cardElement);
  hideEmptyBlock(offer.guests, '.popup__text--capacity', cardElement);
  cardElement.querySelector('.popup__type').textContent = transformType(offer.type);
  hideEmptyBlock(offer.type, '.popup__type', cardElement);
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  hideEmptyBlock(offer.checkin, '.popup__text--time', cardElement);
  hideEmptyBlock(offer.checkout, '.popup__text--time', cardElement);

  const featuresList = cardElement.querySelector('.popup__features');

  for (let i = featuresList.children.length - 1; i >= 0; i--) {
    const item = featuresList.children[i];

    item.parentElement.removeChild(item);
  }

  offer.features.forEach((element) => {
    const featureItem = document.createElement('li');

    featuresList.appendChild(featureItem).classList.add('popup__feature', `popup__feature--${element}`);
  });

  hideEmptyBlock(offer.features, '.popup__features', cardElement);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  hideEmptyBlock(offer.description, '.popup__description', cardElement);
  
  const photoList = cardElement.querySelector('.popup__photos');
  const photoItem = cardElement.querySelector('.popup__photo');

  photoList.removeChild(photoItem);

  offer.photos.forEach((element) => {
    const newPhoto = photoItem.cloneNode(true);

    photoList.appendChild(newPhoto).src = element;
  });

  hideEmptyBlock(offer.photos, '.popup__photos', cardElement);

  parentBlock.appendChild(cardElement);
}

export { insertDataInCard };