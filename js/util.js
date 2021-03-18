const ALERT_SHOW_TIME = 5000;
const DECIMAL_PLACES_COUNT = 20;
const ESCAPE = 'Escape';

const checkInterval = (min, max) => {
  if (min > max) {
    throw new Error('Начальное значение диапазона больше конечного');
  }

  if (max < 0) {
    throw new Error('Конечное значение диапазона не может являться отрицательным числом');
  }

  if (min < 0) {
    throw new Error('Начальное значение диапазона не может являться отрицательным числом');
  }
}

const getRandomIntegerNumber = (min, max) => {
  checkInterval(min, max);

  return Math.floor((Math.random() * (max - min + 1)) + min);
}

const getRandomFloatNumber = (min, max, decimalPlaces) => {
  checkInterval(min, max);

  if (decimalPlaces < 0 || decimalPlaces > DECIMAL_PLACES_COUNT) {
    throw new Error('Неверно введено количество знаков после запятой');
  }

  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

const createUniqueArray = (array) => {
  let result = [];

  array.forEach(element => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });

  result.sort(() => Math.random() - 0.5).splice(0, getRandomIntegerNumber(0, result.length - 1));

  return result;
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerNumber(0, elements.length - 1)];
}

const generatePhotoUrl = (firstNumber, lastNumber) =>  {
  checkInterval(firstNumber, lastNumber);
  let result = [];

  for (let i = firstNumber; i <= lastNumber; i++) {
    result.push(`http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`);
  }

  return result;
}

const isEscEvent = (evt) => {
  return evt.key === ESCAPE;
};

const createErrorAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.classList.add('error-alert');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export { getRandomIntegerNumber, getRandomFloatNumber, createUniqueArray, getRandomArrayElement, generatePhotoUrl, isEscEvent, createErrorAlert };
