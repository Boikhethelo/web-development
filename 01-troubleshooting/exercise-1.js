/**
 * Exercise 1 — Fix the bugs
 *
 * This function has THREE separate bugs in it: one of each type you read
 * about in the README (SyntaxError, ReferenceError, TypeError). Fix them
 * one at a time — fix the syntax error first (nothing else can run until
 * you do), reload after each fix, and read the new error each time.
 *
 * Do not rewrite the function's logic — it should just add 10% tax onto a
 * price and log the result. Only fix what's broken.
 */

function addTax(price) {
  const taxRate = 0.1
  const total = pryce * (1 + taxRate); // <- bug 1: typo'd variable name
  return total.toFixd(2);              // <- bug 2: typo'd method name
} // <- bug 3 is elsewhere: this function is never actually called below.
  // Add a call to addTax(100) and console.log the result once it's fixed.
