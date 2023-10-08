const URL = 'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true'
const MAX_PER_PAGE = 50;
//состояние приложения
const APP_STATE = {
  currentPage: '1',
  sortType: 'none',
  sortKey: '',
  data: [],
  currentPageItems: [],
}
//функция создания элемента
function createElement (tag, className) {
  const el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  return el;
}
//функция создания селекта для сортировки, 
//при переключении вариантов, соответствующий ключ и тип сортировки устанавливается в состоянии приложения
//все селекты обнуляются, а активным остается только текущий, далее обновляются данные на странице
function createSortSelect (key) {
  const select = createElement('select', 'title__sort');
  select.dataset.sort = key;
  const options = [
    {type: '', text:'Сортировать'}, 
    {type: 'ascending', text:'По возрастанию'}, 
    {type: 'descending', text:'По убыванию'}].map(({type, text}) => {
    const opt = createElement('option');
    opt.value = type;
    opt.textContent = text;
    return opt;
  });
  select.append(...options);
  select.addEventListener('change', () => {
    APP_STATE.sortType = select.value;
    APP_STATE.sortKey = select.dataset.sort;
    resetSelection();
    sortData(APP_STATE.currentPageItems, APP_STATE.sortKey, APP_STATE.sortType);
    updateTableData(APP_STATE.currentPageItems);
  });
  return select;
}
//обнуление селектов при переключении между колонками
function resetSelection() {
  const allSelects = document.querySelectorAll('.title__sort');
  for (const select of allSelects) {
    if (select.dataset.sort !== APP_STATE.sortKey) {
      select.value = '';
    }
  }
}
//функция создания заголовка таблицы из полученных ключей объектов
function createTableHead(keys) {
  const tableHead = createElement('thead', 'title__cell');
  const tableHeadCells = keys.map(el => {
    const titleItem = createElement('th');
    titleItem.innerHTML = `<span>${el[0].toUpperCase() + el.slice(1)}</span>`;
    titleItem.append(createSortSelect(el))
    return titleItem;
  });
  const headRow = createElement('tr', 'title__row');
  headRow.append(...tableHeadCells);
  tableHead.append(headRow);
  return tableHead;
}

// создание строк таблицы с элементами
function createItemList (data) {
  const itemRowList = data.map(item => {
    const row = createElement('tr', 'table__item');
    Object.values(item).forEach((value) => {
      const cell = createElement('td');
      cell.textContent = value;
      row.append(cell);
    })
    return row;
  });
  return itemRowList;
};
//создание тела таблицы
function createTableBody (data) {
  const tBody = createElement('tBody', 'table__body');
  const itemList = createItemList(data);
  tBody.append(...itemList);
  return tBody;
};
//создание таблицы
function createTable(data) {
  const table = createElement('table', 'table');
  const tBody = createTableBody(data);
  const thead = createTableHead(Object.keys(data[0]));
  table.append(thead);
  table.append(tBody);
  return table;
};
//обновление данных таблицы - для использования при сортировке и переключении страниц
function updateTableData (data) {
  const table = document.querySelector('.table');
  const tableBody = document.querySelector('.table__body');
  tableBody.remove();
  const newBody = createTableBody(data);
  table.append(newBody);
}
// создание блока с кликабельными страницами - число страниц получаем в зависимости от длины полученного массива
function createPagination (data, pageCount, currentPage) {
  const pagination = createElement('div', 'page__container');
  for (let i = 0; i < pageCount; i++) {
    const pageItem = createElement('p', 'page__item');
    pageItem.textContent = i + 1;
    pageItem.setAttribute('data-page', i + 1);
    if (`${i + 1 }`=== currentPage) {
      pageItem.classList.add('page__item_active');
    }
    pagination.append(pageItem);
    pageItem.addEventListener('click', () => handlePageChange(data, pageItem.dataset.page));
  }
  return pagination;
}

// при переключении страниц обновляем тело таблицы, класс активной/текущей страницы и, если установлена сортировка по какому-либо
// столбцу, то отображаем сортированные данные для активной страницы
function handlePageChange (data, pageNum) {
  APP_STATE.currentPage = pageNum;
  resetPageClass(APP_STATE.currentPage);
  APP_STATE.currentPageItems = getItemsPerPage(data, APP_STATE.currentPage);
  sortData(APP_STATE.currentPageItems, APP_STATE.sortKey, APP_STATE.sortType);  
  updateTableData(APP_STATE.currentPageItems);
}
//обновление активной страницы
function resetPageClass (currentPage) {
  const allPageBtns = document.querySelectorAll('.page__item');
  for (const page of allPageBtns) {
    page.classList.remove('page__item_active');
    const dataAttr = page.dataset.page?? '1';
    if (dataAttr === currentPage) {
      page.classList.add('page__item_active');
    }
  }
}
//получение данных по ссылке
async function getData() {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Oops, can't load data. Error: ${error}`);
  }
}
// сортировка данных по ключу и типу в зависимости от типа значения (разные методы сортировки для числовых и строковых значений)
function sortData (data, sortKey, sortType) {
    switch (sortType) {
      case 'ascending':
        data.sort((a, b) => {
          if (typeof a[sortKey] !== 'number') {
            return a[sortKey].localeCompare(b[sortKey])
          } else {
            return a[sortKey] - b[sortKey];
          }
        });
        break;
      case 'descending':
        data.sort((a, b) => {
          if (typeof a[sortKey] !== 'number') {
            return b[sortKey].localeCompare(a[sortKey])
          } else {
            return b[sortKey] - a[sortKey];
          }
        });
        break;
      case '':
        return;
    }
}
//получение части массива для текущей страницы (по индексам начала и конца элементов для данной страницы)
function getItemsPerPage (data, currentPage, limit = MAX_PER_PAGE) {
  let start = (+currentPage - 1) * limit;
  let end = (start + limit)
  return data.slice(start, end);
}
//получение кол-ва страниц
function getPagesNumber (data, limit) {
  return Math.floor(data.length / limit);
}
//иницирование приложения - получаем данные и монтируем элементы на страницу
function initApp () {
  const app = document.getElementById('app');

  getData()
  .then((data) => {
    APP_STATE.data = data;
    const initPageData = getItemsPerPage(data, APP_STATE.currentPage, MAX_PER_PAGE);
    APP_STATE.currentPageItems = initPageData;
    const table = createTable(initPageData);
    let pageCount = getPagesNumber(APP_STATE.data, MAX_PER_PAGE);
    const pageEl = createPagination(APP_STATE.data, pageCount, APP_STATE.currentPage);
    app.append(table, pageEl);
  })
  .catch(err => {
    console.log(err)
  })
}

initApp();