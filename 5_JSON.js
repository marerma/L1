// Разработайте функцию преобразования JSON в связный список. 
// На входе функция должна получать JSON, содержащий список объектов, на выходе объект,
// представляющий из себя односвязный список.

// создаем класс узла списка. Если не передана ссылка на след. узел, то она указывает на null
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
// создаем класс списка с методом добавления узла и геттером списка 
// для последующего отображения списка в функции форматирования.
//  Если не передана ссылка на след. узел, то она указывает на null
class LinkedList {
  constructor() {
    this.head = null;
    this.current = null;
  }

  addNode (value) {
    const newNode = new Node(value);

    // если голова еще не задана, то первый добавленный узел становится головой
    // текущий узел переставляем на новый узел
    if (!this.head) {
      this.head = newNode;
      this.head.next = null;
      this.current = newNode;
      return this;
    }
    // иначе переопределяем узел, на который указывает текущий указатель: то есть новый узел становится текущим, а предыдущий начинает на него ссылаться
    this.current.next = newNode;
    this.current = newNode;
    return this;
  }

  // метод для получения всего списка, начиная с головы
  getList() {
    return this.head;
  }
}

// проходим по списку json и добавляем в список узлы, используя классы выше. В конце выводим массив полученных значений.
function convertJSONtoLinkedList (json) {
  const list = new LinkedList();
  for (const node of json) {
    list.addNode(node)
  }
  return JSON.parse(JSON.stringify(list.getList()));
}

// вариант без конструктора: отслеживаем текущий узел
// если текущего элемента еще нет - он первый, устанавливаем его
// далее каждый раз меняем указатель текущего элемента на новый и новый элемент делаем текущим
 
function convertJSONtoLinkedList2 (json) {
  let current = null;

  const list = [];

  for (const node of json) {
    const value = node;
    if (!current) {
      current = { value, next: null };
      list.push(current);
    } else {
      current.next = { value, next: null };
      current = current.next;
    }
  }
  return list;
}
