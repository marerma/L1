// Разработайте функцию преобразования JSON в связный список. 
// На входе функция должна получать JSON, содержащий список объектов, на выходе объект,
// представляющий из себя односвязный список.

// создаем класс узла списка. Если не передана ссылка на след. узел, то null
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
// создаем класс списка с методом добавления узла и геттером списка 
// для последующего отображения списка в функции форматирования.
//  Если не передана ссылка на след. узел, то null
class LinkedList {
  constructor() {
    this.head = null;
    this.current = null;
  }

  addNode (value) {
    const newNode = new Node(value);

    // если голова еще не задана, то первый добавленный узел становится головой
    if (!this.head) {
      this.head = newNode;
      this.head.next = null;
      this.current = newNode;
      return this;
    }
    // иначе переопределяем узел, на который указывает текущий указатель, и его указатель
    this.current.next = newNode;
    this.current = newNode;
    return this;
  }

  getList() {
    return JSON.parse(JSON.stringify(this.head));
  }
}

// проходим по списку json и добавляем в список узлы. В конце выводим массив полученных значений.
function convertJSONtoLinkedList (json) {
  const list = new LinkedList();
  for (const node of json) {
    list.addNode(JSON.stringify(node))
  }
  return list.getList();
}

// вариант без конструктора: отслеживаем голову и текучщий узел
// если нет головы, устанавливаем ее
// далее каждый раз меняем указатель текущего элемента на новый 
 
function convertJSONtoLinkedList2 (json) {
  let head = null;
  let current = null;

  const list = [];

  for (const node of json) {
    const value = JSON.stringify(node);
    if (!head) {
      head = { value, next: null };
      list.push(head);
      current = list.at(-1);
    } else {
      current.next = { value, next: null };
      current = current.next;
    }
  }
  return JSON.parse(JSON.stringify(list));
}


// const obj = [
//   {
//     "userId": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   },
//   {
//     "userId": 2,
//     "title": "qui est esse",
//   },
//   {
//     "userId": 3,
//     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//   },
//   {
//     "userId": 4,
//     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//   },
//   {
//     "userId": 5,
//     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//   },
// ]
