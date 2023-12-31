// Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:

// 112 сообщения
// 12 сообщений
// 1 сообщение
// 1024 пользователя
// 1026 пользователей
// 121 пользователь


// 	Функцию надо упаковать в модуль.

// проверяем последние две цифры (если в диапазоне от 11 до 19 включительно, то возвращаем вторую форму).
// далее смотрим на поледнюю цифру - в зависимости от ее значения выбираем соотв. форму слова
// использую шаблонные строки для формирования ответа

module.exports = function getPluralForm (num, wordsForm) {
  const lastDigits = num % 100;

  if (lastDigits > 10 && lastDigits < 20) {
    return `${num} ${wordsForm[1]}`;
  } else if (num === 1 || num % 10 === 1) {
    return `${num} ${wordsForm[0]}`;
  } else if ((num >= 2 && num < 5) || (num % 10 >= 2 && num % 10 < 5)) {
    return  `${num} ${wordsForm[2]}`;
  } else {
    return  `${num} ${wordsForm[1]}`;
  }
}