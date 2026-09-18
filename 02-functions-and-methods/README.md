# 02 — Functions and Methods

## What this is
A **function** is a named, reusable block of code. A **method** is just a
function that lives on an object (`array.map(...)` — `map` is a method of
the array). Same underlying thing, different name depending on where it lives.
This is the basic unit everything else in JS is built from — events call
functions, promises resolve into functions, DOM code is mostly calling and
writing methods.

## The forms you'll see, and when
```js
// 1. Function declaration — hoisted (usable before its line in the file)
function greet(name) { return `Hi, ${name}`; }

// 2. Function expression — stored in a variable, NOT hoisted
const greet2 = function (name) { return `Hi, ${name}`; };

// 3. Arrow function — shorter, and does NOT get its own `this`
//    (this matters a lot in folder 04 — object-oriented JS)
const greet3 = (name) => `Hi, ${name}`;

// 4. Method — a function as a property of an object
const person = {
  name: "Mogs",
  sayHi() { return `Hi, I'm ${this.name}`; } // shorthand method syntax
};
```
Coming from Java: there's no method overloading by parameter type/count —
a JS function just takes whatever arguments you pass it, and missing
arguments come through as `undefined` rather than a compile error. That's a
double-edged sword — more flexible, but the compiler won't catch a
mis-matched call for you, which loops back to folder `01`.

## Parameters worth knowing
- **Default parameters**: `function f(x = 10) {}` — used when no argument (or
  `undefined`) is passed.
- **Rest parameters**: `function f(...args) {}` — collects any number of
  arguments into an array.
- **Destructured parameters**: `function f({ name, age }) {}` — pulls fields
  straight out of an object argument.

## How this connects forward
- `03 events` — event listeners take a function as their "what to do" argument.
- `04 object-oriented JS` — methods are how objects get behaviour.
- `15 promises` / `16 async/await` — `.then()` takes a function; `async`
  turns a function into one that can `await`.
