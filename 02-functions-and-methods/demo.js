/**
 * demo.js — Functions and Methods
 */

// --- Card 1: function declaration -----------------------------------------
/** Builds a greeting string for a given name. */
function greet(name) {
  return name ? `Hi, ${name}!` : "Hi, stranger!";
}

document.getElementById("greet-btn").addEventListener("click", () => {
  const name = document.getElementById("name-input").value;
  document.getElementById("greet-result").textContent = greet(name);
});

// --- Card 2: method on an object -------------------------------------------
const person = {
  name: "Mogs",
  role: "software engineering student",
  /** Shorthand method syntax — `this` refers to `person` when called as person.sayHi() */
  sayHi() {
    return `Hi, I'm ${this.name}, a ${this.role}.`;
  },
};

document.getElementById("method-btn").addEventListener("click", () => {
  document.getElementById("method-result").textContent = person.sayHi();
});

// --- Card 3: array methods (functions passed INTO methods) -----------------
document.getElementById("array-btn").addEventListener("click", () => {
  const prices = [19.99, 5.5, 42, 3.25];

  // .map() takes a function and returns a NEW array, transformed
  const withTax = prices.map((price) => price * 1.15);

  // .filter() takes a function and returns a NEW array, only matching items
  const expensive = withTax.filter((price) => price > 10);

  // .reduce() takes a function and folds the array down into one value
  const total = withTax.reduce((sum, price) => sum + price, 0);

  document.getElementById("array-result").textContent =
    `With tax: [${withTax.map((p) => p.toFixed(2)).join(", ")}] | ` +
    `Over $10: [${expensive.map((p) => p.toFixed(2)).join(", ")}] | ` +
    `Total: $${total.toFixed(2)}`;
});
