/**
 * Exercise 1 — extends and super
 *
 * A `Shape` base class is given below. TODO:
 * 1. Create a `Rectangle` class that extends Shape, with a constructor
 *    taking (width, height), and an area() method returning width * height.
 * 2. Create a `Circle` class that extends Shape, with a constructor taking
 *    (radius), and an area() method returning Math.PI * radius * radius.
 * 3. Both constructors must call super(name) — pass "Rectangle"/"Circle".
 * 4. Give Shape a describe() method that both children can use UNCHANGED
 *    (don't override it) — it should return
 *    `${this.name} has an area of ${this.area().toFixed(2)}`
 *    (this only works once area() exists on the child — that's the point:
 *    the parent method calls a method the child is responsible for defining)
 */

class Shape {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return `${this.name} has an area of ${this.area().toFixed(2)}`;
  }
}

// class Rectangle extends Shape { ... }
// class Circle extends Shape { ... }

// const r = new Rectangle(4, 5);
// const c = new Circle(3);
// console.log(r.describe()); // "Rectangle has an area of 20.00"
// console.log(c.describe()); // "Circle has an area of 28.27"
