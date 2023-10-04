// Реализовать функцию конвертации JSON в строку
// Метод JSON.stringify() преобразует значение в представляющую его нотацию JSON со следующими оговорками:

// Порядок преобразования в строку свойств объектов, не являющихся массивами, не гарантируется. Не полагайтесь на порядок свойств во время преобразования.
// Объекты Boolean, Number и String преобразуются в соответствующие примитивные значения, в соответствии с традиционным соглашением о семантике преобразований.
// Значение undefined, функция или символ, встреченные во время преобразования, будут либо опущены (если они найдены в объекте), либо превращены в null (если они найдены в массиве).

function convertJSONtoString(obj) {
  // вспомогательные функции для определения типа
  const isArray = (array) => Array.isArray(array);
  const isString = (a) => typeof a === 'string';
  const otherType = (a) => typeof a === 'symbol' || typeof a === 'function' || typeof a === 'undefined';

  // если переданный аргумент не типа "объект", то возвращаем преобразованный в строку аргумент (для строки добавляем характерные двойные кавычки)
  if (typeof obj !== 'object' || !obj) {
    if (isString(obj)) {
      return `"${obj}"`
    } else {
      return String(obj)
    }
  } else {
    // иначе мы начинаем обход по объекту. Объявляем результирующий массив, который будет хранить конвертированные значения 
    const resultString = [];
    
    // Если аргумент является массивом, то проходим по каждому элементу массива и рекурсивно применяем нашу функцию для каждого. 
    // По завершении обхода массива в результирующий массив пушим строку со скобками массива "[", "]"
    if (isArray(obj)) {
      let arrayString = [];
      for (const el of obj) {
        const convertEl = otherType(el) ? String(null) : convertJSONtoString(el); // доп. проверка, является ли эл функцией, символом или undefined, чтобы правильно преобразовать
        arrayString.push(convertEl);
      }
      resultString.push('[' + arrayString.join(',') + ']');
    } else {
        // Если аргумент не является массивом, то проходим по каждому ключу объекта и рекурсивно применяем нашу функцию для каждого значения. 
        // По завершении обхода объекта в результирующий массив пушим строку со скобками объекта "{", "}"
      let objString = [];
      for (const key of Object.keys(obj)) {
        const conevertedKey = convertJSONtoString(key);
        // доп. проверка, является ли эл функцией, символом или undefined, если является - то пропускаем и переходим к след.ключу
        if (otherType(obj[key])) {
          continue;
        } else {
          const convertEl = convertJSONtoString(obj[key]);
          objString.push(`${conevertedKey}:${convertEl}`);
        }
      }
      resultString.push('{'+ objString.join(',') + '}')
    }
    return resultString.join(',');
  }
}


// // массив с разными объектами для тестирования работы функции и проверки результата на равность со втроенным методом JSON.stringify
// const testObjects = [
//   { x: undefined, y: Object, z: Symbol("") }, 
//   { [Symbol.for("foo")]: "foo" }, 
//   true, 
//   'foo', 
//   [1, "false", false], 
//   { x: 5, y: 6 }, 
//   {k: {
//     b: [1, 4, function a () { return 4}],
//     a: function () { return 4},
//     c: null
//   }
// }]

// function testunction (argsArr) {
//   for (let i = 0; i < argsArr.length; i++) {
//     const el = argsArr[i];
//     if (JSON.stringify(el) !== convertJSONtoString(el)) {
//       return false
//     }
//   }
//   return true;
// }
