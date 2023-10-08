// Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи. 
// При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер хранилища.

// получить размер занятого текущего хранилища в МБ
function getSizeLS () {
  let valuesSize = new Blob(Object.values(localStorage)).size;
  let keysSize = new Blob(Object.keys(localStorage)).size;
  let totalDataSize = (valuesSize + keysSize) / 1024 / 1024;
  return totalDataSize.toFixed(2);
}
// функция получения максимального размера хранилища
function getMaxLSSize () {
  // сначала сохраним все, что на нашей вкладке уже лежит в локал сторадж, чтобы не потерять кешированные посты
  const localStorageData = {};

  for (let key of Object.keys(localStorage)) {
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }
  localStorage.clear();
  // заполняем хранилище до максимума, пока оно не заполнится до максимума
  try {
    let data = 'a'.repeat(100000); 
    let totalData = '';
    let i = 0;
    
    while (true) {
      let key = `data_${i}`;
      localStorage.setItem(key, data);
      totalData += data;

      if (localStorage.getItem(key) !== data) {
        localStorage.removeItem(key);
        break;
      }
      i++;
    }
  } catch (error) {
    // при переполнении хранилища выбросится ошибка, получаем размер хранилища и сохраняем в переменную
    const maxSize = getSizeLS();
    // очищаем хранилище и наполняем его из наших данных - постов
    localStorage.clear();
    for (let key of Object.keys(localStorageData)) {
      localStorage.setItem(key, localStorageData[key]);
    }
    return maxSize;
  }
}


// чтобы слушать событие изменения в хранилище, нужно прослушивать событие storage,
// однако работать код будет только если событие происходит в другой вкладке

function logLocalStorageChange() {
  const current = getSizeLS();
  const max =  getMaxLSSize();
  console.log("Занято памяти: " + current + "мегабайт / из " + max + "мегабайт");
}

//**********************/
// если  по задаче принципиально отслеживать событие в рамках текущего окна, 
// то можно перезаписать/расширить методы локального хранилища, чтобы при их вызове также 
// вызывался наш коллбек для отображения размера, но это только в рамках задания - в реальности я бы считала это не очень хорошей практикой

const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  originalSetItem.apply(this, arguments);
  logLocalStorageChange();
}
const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function(key, value) {
  originalRemoveItem.apply(this, arguments);
  logLocalStorageChange();
}

const originalClear = localStorage.clear;
localStorage.clear = function() {
  originalClear.apply(this, arguments);
  logLocalStorageChange();
}
