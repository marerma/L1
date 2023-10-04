// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

function convertStringToJSON(string) {
  // вспомогательные функции для парсинга разных значений

  // пропустить пробелы
  const skipSpace = () => {
    while (pos < string.length && string[pos] === ' ') {
      pos++;
    }
  }
 // пропустить запятую
  const skipComma = () => {
    if (string[pos] !== ",") {
      throw new Error('Expected ","');
    }
    pos++;
  }
 // пропустить двоеточие
  const skipColon = () => {
    if (string[pos] !== ":") {
      throw new Error('Expected ":"');
    }
    pos++;
  }

  const parseValue = () => {
    skipSpace();
    const value = 
      parseString() ??
      parseNumber() ??
      parseObject() ?? 
      parseArray() ??
      parseBooleanAndNull()
    skipSpace();
    return value;
  }

  const parseArray = () => {
    if (string[pos] === '[') {
      pos++; // если символ открывающейся квадратной скобки, то сдвигаем на символ вправо
      skipSpace(); // пропускаем возможные пробелы
      const array = []; // создаем пустой результирующий массив
      let firstCicle = true; 
      // при первого элемента нам не нужно очищать/пропускать возможные запятые или пробелы, поэтому добавляем флаг
      // для отслеживания. При след.элементах, мы пропускаем пробел и запятые между элементами

      // пока не встретим закрывающую квадратную скобку, двигаем указатель (сдвигаем после первого элемента, пропуская запятую и пробел)
      while (string[pos] !== ']') {
        if(!firstCicle) {
          skipComma();
          skipSpace();
        }
        let value = parseValue();
        array.push(value);
        firstCicle = false;
      }
      // сдвигаем уазатель на след. знак после ']'
      pos++;
      return array;
    }
  }

  const parseObject = () => {
    if (string[pos] === '{') {
      pos++; // если символ открывающейся фигурной скобки, то сдвигаем на символ вправо
      skipSpace(); // пропускаем возможные пробелы
      const obj = {}; // создаем объект
      let firstCicle = true; // при первого ключа нам не нужно очищать/пропускать возможные запятые или пробелы, поэтому добавляем флаг
      
      // пока не встретим закрывающую фигурную скобку, двигаем указатель (сдвигаем после первого элемента, пропуская запятую и пробел)
      while (string[pos] !== '}') {
        if (!firstCicle) {
          skipComma();
          skipSpace();
        }
        let key = parseString();
        skipSpace();
        skipColon();
        let value = parseValue();
        obj[key] = value;
        firstCicle = false;
      }
      // сдвигаем уазатель на след. знак после '}'
      pos++;
      return obj;
    }
  }

  // парсинг строки - если первый символ '"', то формируем строку до тех пор, пока не встретим закрывающую '"'
  const parseString = () => {
    if (string[pos] === '"') {
      pos++;
      let result = '';
      while (string[pos] !== '"') {
        result += string[pos];
        pos++;
      }
      pos++;
      return result;
    }
   }
  
  // парсинг булевых значений и null - по первому символу определяем, что за значение, 
  // далее если последующие символы позволяют составить значение true, false или null, то сдвигаем указатель на конец значения и возвращаем значение

  const parseBooleanAndNull = () => {
    if (string[pos] === 't') {
      if (string.slice(pos, pos + 4) === 'true') {
        pos += 4;
        return true;
      } else {
        throw new SyntaxError('Unexpected token');
      }
    } 
    
    if (string[pos] === 'f') {
      if (string.slice(pos, pos + 5) === 'false') {
        pos += 5;
        return false;
      } else {
        throw new SyntaxError('Unexpected token');
      }
    }

    if (string[pos] === 'n') {
      if (string.slice(pos, pos + 4) === 'null') {
        pos += 4;
        return null;
      } else {
        throw new SyntaxError('Unexpected token');
      }
    }
  }

  const isNum = () => {
    const numString = '1234567890';
    return numString.includes(string[pos]);
  }
  // парсинг чисел - если символ в текущей позиции являтся цифрой или '.', то формируем массив из каждого символа
  // если массив не пустой, то преобразуем массив в строку, а ее переводим к числу.
  const parseNumber = () => {
    let num = [];
    while (pos < string.length && (isNum() || string[pos] === '.')) {
      num.push(string[pos]);
      pos++;
      skipSpace();
    }
    if (num.length) {
      return Number(num.join(''));
    };
  }

  let pos = 0;
  return parseValue();
}

const a = JSON.stringify( {k: {
      b: [1, 4.3920392, function a () { return 4}],
      a: function () { return 4},
      c: true
    }
  })

console.log(JSON.parse(a), convertStringToJSON(a))