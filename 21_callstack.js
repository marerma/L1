
// Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).
// Chrome: глубина 13913
// FireFox: глубина разные показатели от 27 000 до ~32 000
// Opera: глубина 13913

// вызываем рекурсивно функцию для определения глубины коллстека без переменных
// Если в функции будут объявлятся переменные, то глубина коллстека будет уменьшаться
function calculateDepths () {
  let stackDepth = 0;

  function recursiveFunction() {
    stackDepth++;
    recursiveFunction();
  }

  try {
    recursiveFunction();
  } catch (error) {
    return stackDepth;
  }
}

function calculateDepthsWith5Args () {
  let stackDepth = 0;

  function recursiveFunction() {
    let a = stackDepth;
    let b = stackDepth + 1;
    let c = stackDepth + 2;
    let d = stackDepth + 3;
    let e = stackDepth + 4;

    stackDepth++;
    recursiveFunction();
  }

  try {
    recursiveFunction();
  } catch (error) {
    return stackDepth;
  }
}
// подсчет размера коллстека по объему
// funcSize = место в коллстеке + (кол-во переменных * размер переменной)
// размер коллстека без переменных = (место в памяти, занимаемое ф-цией в коллстеке, + 0 * размер переменной)
// если вызывать рекурсивный подсчет глубины коллстека, например, с 5 переменными, хранящими числа, то в хроме размер коллстека будет ~8944
// такми образом можно подсчитать размер коллстека в мб, принимая что числа "весят" 8байт
// размер коллстека с 5 переменными = (место в памяти, занимаемое ф-цией в коллстеке, + 5 * размер переменной)
// одна функция занимет около 72 байт в стеке, значит общий размер коллстека 72 * 13913 = 955KB
// по документации 984KB https://github.com/v8/v8/blob/5fe0aa3bc79c0a9d3ad546b79211f07105f09585/src/common/globals.h#L90
function calculateMemory () {
  const fullSizeWihtoutArgs = calculateDepths();
  const fullSizeWithArgs = calculateDepthsWith5Args();
  // 40 это 5 чисел по 8кб
  return (fullSizeWithArgs - fullSizeWihtoutArgs)/ 40 * fullSizeWithArgs;
}