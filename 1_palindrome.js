// Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом. 
// Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра »). 
// **(одинаковые буквы в разном регистре считаются равными)

// с ипользованием встроенных методов строк

function isPalindrom (str) {
  let clearStr = str.replace(/[^a-z0-9]/gi, '');
  return clearStr.toLowerCase().split('').reverse().join('') === clearStr.toLowerCase();
}

// два указателя с проверкой, является ли символ буквой/цифрой или иным символом

function isPalindromTwoPointers (str) {
  let l = 0;
  let r = str.length - 1;

  // определяем, является ли символ буквой или цифрой
  const isAlfanumeric = (char) => {
    const digit = /[0-9]/ig
    if (digit.test(char) || char.toLowerCase() !== char.toUpperCase()) {
      return true;
    } else return false;
  }

  while (l < r) {
    let charL = str[l];
    let charR = str[r];

    if (!isAlfanumeric(charL)) {
      l++;
      continue;
    }

    if (!isAlfanumeric(charR)) {
      r--;
      continue;
    }

    if (charL.toLowerCase() !== charR.toLowerCase()) {
      return false;
    } else {
      l++;
      r--;
    }
  }
  return true;
}