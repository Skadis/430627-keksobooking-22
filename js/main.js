// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntegerNumber(min, max) {
  if (min > max || max < 0 || min < 0) {
    alert('Неверно введён диапазон');
    return null;
  }

  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomFloatNumber(min, max, decimalPlaces) {
  if (min > max || max < 0 || min < 0) {
    alert('Неверно введён диапазон');
    return null;
  }

  if (decimalPlaces < 0 || decimalPlaces > 20) {
    alert('Неверно введено количество знаков после запятой');
    return null;
  }

  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

getRandomIntegerNumber(1, 26);
getRandomFloatNumber(1.2351, 6.234, 4);
