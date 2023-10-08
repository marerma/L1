// Задача о коллекции функций: у вас есть массив функций, напишите код, 
// который вызовет каждую функцию в этом массиве и выведет их порядковый номер. 
// Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// Вызвать первую функцию из массива.
// После завершения работы первой функции вызвать вторую функцию.
// После завершения работы второй функции вызвать третью функцию.
// И так далее, пока все функции в массиве не будут вызваны по порядку.

// просто проходим по функциям по очереди и вызываем их - если уверены, что они синхронные
function showFnIndex (fnArray) {
fnArray.forEach((fn, ind) => {
  if (typeof fn === 'function') {
    fn();
    console.log(`Индекс выполненной функции ${ind}`)
  }
  });
}

// проходим по функциям и ожидаем выполнения их через async-await
async function showFnIndex2 (fnArray) {
  let ind = 0;
  for (const fn of fnArray) {
    await fn();
    console.log(`Индекс выполненной функции ${ind}`);
    ind++;
  }
}

// рекурсивно идем по массиву, пока не кончатся функции
function showFnIndex3 (fnArray) {
  let limit = fnArray.length - 1;
  let i = 0;

  function showInd (ind) {
    fnArray[ind]();
    console.log(`Индекс выполненной функции ${ind}`);
    if (ind === limit) {
      return;
    } 
    return showInd(++ind);
  };
  showInd(i);
}

// через очередь
function showFnIndex4 (fnArray) {
  let ind = 0;
  while (fnArray.length) {
    let firstFn = fnArray.shift();
    firstFn();
    console.log(`Индекс выполненной функции ${ind}`);
    ind++;
  }
}