// Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует функцию для работы с датами. 
// Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

// Функция возвращает возраст в днях, минутах или секундах.
// Параметр ввода - строка, день рождения в формате "DD-MM-YYYY"

import moment from 'moment';

export function getYourAgeInDays (birthDate) {
  const enteredDate = moment(birthDate, 'DD-MM-YYYY');
  const today = moment();
  
  const daysDiff = today.diff(enteredDate, 'days');
  const minDiff = today.diff(enteredDate, 'minutes');
  const secondsDiff = today.diff(enteredDate, 'seconds');

  return `Ваш возраст ${daysDiff} дней, или ${minDiff} минут, или ${secondsDiff} секунд`;
}

// console.log(getYourAgeInDays('22-07-1987'))