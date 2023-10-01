// Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. 
// Напишите код, который сортирует этот массив по возрастанию возраста, 
// а при равных возрастах сортирует по алфавиту по полю name.

//сортировка встроенным методом sort

function sortObjectsArray (array) {
  
  //функция сравнения объектов по возрасту или - при их равнозначности - по имени
  const sortFn = (a, b) => {
    if (a.age === b.age) {
      return a.name.localeCompare(b.name);
    } else {
      return a.age - b.age;
    }
  }
  return array.sort(sortFn);
}

console.log(sortObjectsArray([{ name: 'Mohn', age: 13 }, { name: 'John', age: 13 }, { name: 'Aria', age: 13 }]))