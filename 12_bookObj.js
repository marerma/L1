// Задача на работу с объектами: создайте объект, представляющий собой книгу. Объект должен иметь свойства, такие как: 
// название книги, автор и год издания. Напишите методы для получения и изменения значений свойств книги.

// объявляем объект со свойствами
// получение и изменение свойств возможно только через геттер и сеттер

const book  = {
  _title: "Harry Potter and the Philosopher's Stone",
  _author: "Joanne Rowling",
  _year: '1997',

  get title() {
    return this._title;
  },
  set title(value) {
    this._title = value; 
  },
  get author() {
    return this._author;
  },
  set author(value) {
    this._author = value; 
  },
  get year() {
    return this._year;
  },
  set year(value) {
    this._year = value; 
  },
}

// с использованием обычных методов
const book2  = {
  _title: "Harry Potter and the Philosopher's Stone",
  _author: "Joanne Rowling",
  _year: '1997',

  getBookTitle() {
    return this._title;
  },
  setBookTitle(value) {
    this._title = value; 
  },
  getBookAuthor() {
    return this._author;
  },
  setBookAuthor(value) {
    this._author = value; 
  },
  getBookYear() {
    return this._year;
  },
  setBookYear(value) {
    this._year = value; 
  },
}