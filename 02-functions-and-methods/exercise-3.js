/**
 * Exercise 3 — Methods on an object + array methods together
 *
 * Given the `cart` object below:
 * TODO 1: Add a method `cart.total()` that uses .reduce() to return the sum
 *   of item.price * item.qty for every item in cart.items.
 * TODO 2: Add a method `cart.itemNames()` that uses .map() to return an
 *   array of just the item names.
 * TODO 3: Add a method `cart.expensiveItems(threshold)` that uses .filter()
 *   to return items whose price is greater than `threshold`.
 */

const cart = {
  items: [
    { name: "Keyboard", price: 45, qty: 1 },
    { name: "Mouse", price: 20, qty: 2 },
    { name: "Monitor", price: 150, qty: 1 },
  ],
  // add your methods here
  total(){
    return this.items.reduce((sum, item) => item.price * item.qty, 0);
  },

  itemNames(){
    return this.items.map(item => item.name);
  },

  expensiveItems(threshold) {
    return this.items.filter(item => item.price > threshold);
  }

};

 console.log(cart.total());              // 235
 console.log(cart.itemNames());          // ["Keyboard", "Mouse", "Monitor"]
 console.log(cart.expensiveItems(40));   // Keyboard + Monitor objects
