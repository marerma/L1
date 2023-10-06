// личный токен быстро обновляется, для проверки в live режиме вставить свой актуальный
const TOKEN = ''
// id паблика вконтакте
const GROUP_ID = '4569';
// макс. количество постов для одного запроса
const MAX_POST_COUNT = 4;
// смещение - с какого поста начинать запрос, чтобы не запрашивать уже имеющиеся посты
let offset = 0;
let isLoading = false;
// макс. размер хранилища
// const MAX_LOCAL_STORAGE_SIZE = getMaxLSSize();
const MAX_LOCAL_STORAGE_SIZE = 4;

// форматирование даты поста
function convertData (timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const ruDate = date.toLocaleDateString('ru-RU', options);
  return ruDate;
}

// установить в хранилище
function setToLS (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// получить из хранилища по ключу
function getFromLS (key) {
  if (localStorage.getItem(key)) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } 
  return null;
}

// получить размер занятого текущего хранилища
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

// обновление элементов после изменения размера хранилища
function updateLSsizeUI () {
  const maxSize = document.getElementById('maxSize');
  if (maxSize.textContent !== MAX_LOCAL_STORAGE_SIZE) {
    maxSize.textContent = MAX_LOCAL_STORAGE_SIZE;
  }
  let current = getSizeLS();
  const currentSize = document.getElementById('currentSize');
  currentSize.textContent = current;
}

// получение позиции скролла
function checkScrollPosition() {
  const listContainer = document.querySelector('.widget__list-container');
  const height = listContainer.clientHeight;
  const scrollPosition = listContainer.scrollTop;
  const scrollHeight = listContainer.scrollHeight;
  
  if (height + scrollPosition + 15 >= scrollHeight) {
    return true;
  }
  return false;
}

// обновление списка постов
function fillList (items) {
  const list = document.querySelector('.widget__list');
  const itemsNodes = createItemsList(items);
  list.append(...itemsNodes);
}

// создание списка постов из массива с использованием темплейт, отображаем дату, текст поста, кол-во лайков и, если есть фото
function createItemsList (items) {
  const templ = document.getElementById('itemTempl');
  const itemsNodes = items.map(el => {
    const newItem = templ.content.cloneNode(true);
    const date = newItem.querySelector('.date');
    const text = newItem.querySelector('.text');
    const likes = newItem.querySelector('.likes');
    date.textContent = convertData(el.date);
    text.textContent = el.text;
    likes.textContent = el.likes.count;
    if (el.attachments[0]?.photo?.sizes[1].url) {
      const img = document.createElement('img');
      img.src = el.attachments[0]?.photo?.sizes[1].url;
      img.alt = '';
      img.className = 'photo';
      text.after(img);
    }
    return newItem;
  });
  return itemsNodes;
}

// перед сохранением в хранилище проверяем, не превышает ли текущий размер максимальный
// если так - то будем удалять по одному посту, пока лимит не буде в границах
// также сохраняем offset, чтобы отправлять запросы с верного поста
function saveItemsToLS (items) {
  const newItems = items;
  while (getSizeLS() > MAX_LOCAL_STORAGE_SIZE) {
    newItems.shift();
  }
  setToLS('loadedPosts', newItems);
  setToLS('loadedPostsOffset', offset);
}

// функция для обработки ответа от vk.
// если в ответе ошибка, то отображаем текст ошибки
// если получили данные, то сохраняем в локальное хранилище, сдвигаем offset на макс. кол-во постов и вставляем эти новые посты в конец уже отображаемого списка
// в конце удаляем скрипт, чтобы не множить один и  тот же скрпит. Также проверяем, не идет ли сейчас запрос, чтобы не отправлять дублирующий запрос
function callbackFunc (result) {
  isLoading = false;
  if (result.error) {
    const text = document.createElement('p');
    const list = document.querySelector('.widget__list');
    text.textContent = `${result.error.error_msg}`;
    list.append(text);
  } else {
    const {items} = result.response;
    offset += MAX_POST_COUNT;
    const savedPosts = getFromLS('loadedPosts') || [];
    saveItemsToLS(savedPosts.concat(items)) 
    fillList(items);
  }
  updateLSsizeUI ();
  setTimeout(() => {
    document.getElementById('vk-script')?.remove();
  }, 100);
}

// создаем скрипт для кроссдоменного запроса к vk API https://dev.vk.com/ru/api/api-requests#%D0%9A%D1%80%D0%BE%D1%81%D1%81-%D0%B4%D0%BE%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D1%81%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%D0%BC%20JSONP
function createScript () {
  isLoading = true;
  const script = document.createElement('SCRIPT');
  script.id = 'vk-script';
  script.src = `https://api.vk.com/method/wall.get?owner_id=-${GROUP_ID}&offset=${offset}&count=${MAX_POST_COUNT}&v=5.131&access_token=${TOKEN}&callback=callbackFunc`;
  document.getElementsByTagName("head")[0].appendChild(script);
} 

// при первой загрузке приложения проверяем, если есть сохраненные посты в локальном хранилище, то загружаем сохраненные данные
// если хранилище пустое, то делаем запрос к vk api
function initFirstLoad () {
  if (getFromLS('loadedPosts') && getFromLS('loadedPostsOffset')) {
    offset = +getFromLS('loadedPostsOffset');
    const items = getFromLS('loadedPosts');
    fillList(items);
  } else {
      createScript();
  }
}


window.addEventListener('DOMContentLoaded', () => {
  initFirstLoad();
  updateLSsizeUI ();
  const listContainer = document.querySelector('.widget__list-container');
  listContainer.addEventListener('scroll', () => {
    if (checkScrollPosition() && !isLoading) {
      createScript(); 
    }
  })
});

function handleLocalStorageChange() {
  var usedBytes = 2;
  var totalBytes = 5 * 1024 * 1024; // максимальный размер LocalStorage (5 MB)
  
  console.log("Занято памяти: " + usedBytes + " байт");
  console.log("Максимальный размер хранилища: " + totalBytes + " байт");
}