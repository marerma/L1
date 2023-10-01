// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи 
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го простого числа
// вычисление всех простых чисел до числа N

// функция мемоизации функции
function memo(fn) {
  const memoMap = new Map();

  return (arg) => {
    if (!memoMap.has(arg)) {
      const result = fn(arg);
      memoMap.set(arg, result);
      return result;
    } else {
      return memoMap.get(arg);
    }
  }
};

const MathX  = {
  //общая функция для определения простого числа для переиспользования в других методах
  isPrime(num) {
    if (num < 0) {
      throw new Error('Число должно быть положительным');
    }
    if (num === 1) {
      return false;
    } else {
        for (let i = 2; i < num; i++) {
          if (num % i === 0) return false;
        }
        return true;
    }
  },
// получение н-ного числа Фибоначчи с использованием перестановки значений и переопределения переменных
  getNthFibonacciNum: memo(function (n) {
    let a = 1;
    let b = 1;
    
    if (n === 1 || n === 2) {
      return a;
    }
    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return b;
  }),

  // заполняем массив числами Фибоначчи до тех пор, пока последнее не будет равно введенному числу.
  // введенное число включается в границу.
  getAllFibNums: memo(function (n) {
    const allFibNums = [];
    let fibNum = 1;
    let interation = 2;

    while (fibNum <= n) {
      allFibNums.push(fibNum);
      interation++;
      fibNum = MathX.getNthFibonacciNum(interation);
    }
    return allFibNums;
  }),
  // заполняем массив простыми числами, пока длина массива не будет равна нужному числу.
  // возвращаем последний элемент массива - оно и будет n-ым простым числом.
  // если введен ноль или не число, выбрасывается ошибка
  getPrimeNthNum: memo(function (n) {
    if (n <= 0 || isNaN(n)) {
      throw new Error('Проверьте индекс: он должен быть положительным числом больше 0');
    }
    const primeNums = [];
    let number = 2;
    while (primeNums.length !== n) {
      if (MathX.isPrime(number)) {
        primeNums.push(number);
      }
      number++;
    }
    return primeNums.at(-1) 
  }),
    // заполняем массив простыми числами, пока не дойдем до нужного числа. 
    // Указанное число включается в границу поиска!
  getAllPrimeNums: memo(function (n) {
    const primeNums = [];
    let number = 2;
    while (number <= n) {
      if (MathX.isPrime(number)) {
        primeNums.push(number);
      }
      number++;
    }
    return primeNums;
  }),
}

// console.log(MathX.getAllFibNums(2))
// console.log(MathX.getAllFibNums(2))
// console.log(MathX.getNthFibonacciNum(12))
// console.log(MathX.getNthFibonacciNum(12))