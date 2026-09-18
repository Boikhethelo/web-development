/**
 * Exercise 2 — `this` gotcha
 *
 * Run this file as-is first and read what gets logged — then fix it.
 *
 * The bug: `sayName` is pulled off the object and called alone, so `this`
 * is no longer `counter` inside it.
 *
 * TODO: fix `logNameAfterDelay` WITHOUT changing how it's called at the
 * bottom of the file. Hint: arrow functions don't have their own `this` —
 * try wrapping the call in one. (You'll use exactly this trick constantly
 * once you reach folder 14 — timeouts and intervals.)
 */

const counter = {
  name: "Counter A",
  sayName() {
    console.log(this.name);
  },
  logNameAfterDelay() {
    const detachedMethod = this.sayName;
    setTimeout(detachedMethod, 100); // logs "undefined" as written — fix below
  },
};

counter.logNameAfterDelay();
