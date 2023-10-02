// Задача на классы и наследование: создайте базовый класс Shape (фигура),
//  который имеет методы для расчета площади и периметра. 
//  Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. 
//  Реализуйте методы расчета площади и периметра для каждой фигуры.

// базовая фигура, предположим получает 2 параметра: имя фигуры и длину одной стороны, и является квадратом
class Shape {
  constructor(name, side) {
    this.name = name;
    this.side = side;
  }
  getS() {
    return Math.pow(this.side, 2);
  }
  getP() {
    return 4 * this.side;
  }
  getShapeName() {
    return this.name;
  }
}

// Прямоугольник: расширяем класс, добавляем новый параметр высота. Переопределяем родительские методы получения площади и периметра
class Rectangle extends Shape {
  constructor(name, width, height) {
    super(name, width);
    this.height = height;
  }
  getS() {
    return this.side * this.height;
  }
  getP() {
    return 2 * (this.side + this.height);
  }
}

// расширяем класс, добавляем новые параметры - значения двух других сторон треугольника. 
// Переопределяем родительские методы получения площади и периметра
class Triangle extends Shape {
  constructor(name, side1, side2, side3) {
    super(name, side1);
    this.side2 = side2;
    this.side3 = side3;
  }
  getS() {
    const hafP = this.getP() / 2; 
    return Math.sqrt(hafP * (hafP - this.side) * (hafP - this.side2) * (hafP - this.side3));
  }
  getP() {
    return this.side + this.side2 + this.side3;
  }
}

// расширяем класс, переопределяем родительские методы получения площади и периметра
class Circle extends Shape {
  constructor(name, radius) {
    super(name, radius);
  }
  getS() {
    return Math.PI * Math.pow(this.side, 2);
  }
  getP() {
    return 2 * Math.PI * this.side;
  }
}

// второй вариант: объявить класс без реализации методов, инстансы должны сами определить их реализацию
class Shape2 {
  constructor() {
  }
  getS() {
    throw new Error('The method must be declared in an instance')
  }
  getP() {
    throw new Error('The method must be declared in an instance')
  }
}

// Прямоугольник: расширяем класс, добавляем новый параметр высота. Переопределяем родительские методы получения площади и периметра
class Rectangle2 extends Shape2 {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  getS() {
    return this.width * this.height;
  }
  getP() {
    return 2 * (this.width + this.height);
  }
}

// расширяем класс, добавляем новые параметры - значения двух других сторон треугольника. 
// Переопределяем родительские методы получения площади и периметра
class Triangle2 extends Shape2 {
  constructor( side1, side2, side3) {
    super();
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }
  getS() {
    const hafP = this.getP() / 2; 
    return Math.sqrt(hafP * (hafP - this.side1) * (hafP - this.side2) * (hafP - this.side3));
  }
  getP() {
    return this.side1 + this.side2 + this.side3;
  }
}

// расширяем класс, переопределяем родительские методы получения площади и периметра
class Circle2 extends Shape2 {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  getS() {
    return Math.PI * Math.pow(this.radius, 2);
  }
  getP() {
    return 2 * Math.PI * this.radius;
  }
}