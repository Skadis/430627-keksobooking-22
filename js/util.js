function checkInterval(min, max) {
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

function getRandomIntegerNumber(min, max) {
  checkInterval(min, max);

  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomFloatNumber(min, max, decimalPlaces) {
  checkInterval(min, max);

  if (decimalPlaces < 0 || decimalPlaces > 20) {
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

export { getRandomIntegerNumber, getRandomFloatNumber, createUniqueArray, getRandomArrayElement, generatePhotoUrl };