const hideEmptyBlock = (element, block, parent) => {
  if (element === '' || element === null || element === []) parent.removeChild(parent.querySelector(block));
}

const hideAllEmptyBlocksInCard = ({ author, offer }, parent) => {
  hideEmptyBlock(author.avatar, '.popup__avatar', parent);
  hideEmptyBlock(offer.title, '.popup__title', parent);
  hideEmptyBlock(offer.address, '.popup__text--address', parent);
  hideEmptyBlock(offer.price, '.popup__text--price', parent);
  hideEmptyBlock(offer.rooms, '.popup__text--capacity', parent);
  hideEmptyBlock(offer.guests, '.popup__text--capacity', parent);
  hideEmptyBlock(offer.type, '.popup__type', parent);
  hideEmptyBlock(offer.checkin, '.popup__text--time', parent);
  hideEmptyBlock(offer.checkout, '.popup__text--time', parent);
  hideEmptyBlock(offer.features, '.popup__features', parent);
  hideEmptyBlock(offer.description, '.popup__description', parent);
  hideEmptyBlock(offer.photos, '.popup__photos', parent);
}

const transformType = (type) => {
  switch(type) {
    case 'flat':
      type = 'Квартира'
      break;
    case 'bungalow':
      type = 'Бунгало'
      break;
    case 'house':
      type = 'Дом'
      break;
    case 'palace':
      type = 'Дворец'
      break;
  }

  return type;
}

const generateList = (parent, features) => {
  const featuresList = parent.querySelector('.popup__features');

  for (let i = featuresList.children.length - 1; i >= 0; i--) {
    const item = featuresList.children[i];

    item.parentElement.removeChild(item);
  }

  features.forEach((element) => {
    const featureItem = document.createElement('li');

    featuresList.appendChild(featureItem).classList.add('popup__feature', `popup__feature--${element}`);
  });
}

const generatePhoto = (parent, photosUrl) => {
  const photoList = parent.querySelector('.popup__photos');
  const photoItem = photoList.querySelector('.popup__photo');

  photoList.removeChild(photoItem);

  photosUrl.forEach((element) => {
    const newPhoto = photoItem.cloneNode(true);

    photoList.appendChild(newPhoto).src = element;
  });
}

const insertDataInCard = ({ author, offer }, parent) => {
  parent.querySelector('.popup__avatar').src = author.avatar;
  parent.querySelector('.popup__title').textContent = offer.title;
  parent.querySelector('.popup__text--address').textContent = offer.address;
  parent.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  parent.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  parent.querySelector('.popup__type').textContent = transformType(offer.type);
  parent.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  generateList(parent, offer.features);
  parent.querySelector('.popup__description').textContent = offer.description;
  generatePhoto(parent, offer.photos);
}

const renderCard = (cardData) => {
  const parentBlock = document.querySelector('.map__canvas');
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);

  insertDataInCard(cardData, cardElement);
  hideAllEmptyBlocksInCard(cardData, cardElement);

  parentBlock.appendChild(cardElement);
}

export { renderCard }