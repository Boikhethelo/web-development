# 04 — Object-Oriented JavaScript

## What this is, coming from Java
You already know OOP: classes, encapsulation, `this`. JS has the same ideas,
but the mechanism underneath is different, and that difference matters:

| Java | JavaScript |
|---|---|
| Classes are compiled blueprints | `class` is **syntax sugar** over prototypes — objects are the real thing |
| Fields are typed and declared up front | Objects can gain/lose properties at runtime |
| `this` is fixed to the instance | `this` depends on **how a function is called**, not where it's defined |
| Method overloading exists | Doesn't exist — one method name, one implementation |
| Access modifiers (`private`, `protected`) are a language feature | True privacy uses `#field` syntax (newer) — bolted on, not foundational |

## Objects, the plain way
```js
const car = {
  make: "Toyota",
  speed: 0,
  accelerate(amount) {
    this.speed += amount; // `this` = the object the method was called on
  }
};
car.accelerate(20); // car.speed is now 20
```

## The `class` syntax (what you'll actually write day-to-day)
```js
class Car {
  constructor(make) {
    this.make = make;
    this.speed = 0;
  }
  accelerate(amount) {
    this.speed += amount;
  }
}
const myCar = new Car("Toyota");
```
This looks almost identical to Java. The trap is `this` — in JS, `this` is
determined by *how a function is invoked*, not by where it's written. Pull a
method off an object and call it alone (e.g. pass it as a callback to
`addEventListener`), and `this` will NOT be the object anymore. Arrow
functions deliberately don't have their own `this` — they use whatever `this`
was in the surrounding code, which is why arrow functions are common inside
class methods when you need to guarantee `this` doesn't change (e.g. in a
`setTimeout` callback — see folder 14).

## Encapsulation
```js
class Account {
  #balance = 0; // # makes this genuinely private, unreachable from outside
  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}
```

## How this connects forward
- `05 inheritance` — `class X extends Y` builds directly on what's here.
- `08 manipulating the DOM` — DOM elements themselves are objects with
  properties and methods, same shape as everything in this folder.
