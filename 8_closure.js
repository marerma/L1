// Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, 
// которая вызывает каждую функцию в этом массиве и возвращает массив результатов, 
// полученных после вызова каждой функции.

function getFnResults (fnArray) {
  const result = [];

  return () => {
    for (const fn of fnArray) {
      if(typeof fn === 'function') {
        result.push(fn());
      }
    }
    return result;
  }
}

const array = [
  function() { return 1 },
  function() { return 2 },
  function() { return 3 },
  function() { return 4 }
]
console.log(getFnResults(array)())