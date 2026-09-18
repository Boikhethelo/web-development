/**
 * Exercise 2 — fix the accidentally-sequential code
 *
 * The function below fetches three different users one at a time, awaiting
 * each before starting the next — even though none of them depend on each
 * other's result. That's the performance mistake the README warns about.
 *
 * TODO: rewrite `loadThreeUsers` so all three fetches start together using
 * Promise.all, instead of one after another. Keep it async/await style —
 * you can still `await Promise.all([...])`.
 */

async function loadThreeUsers() {
  const user1 = await fetch("https://jsonplaceholder.typicode.com/users/1").then((r) => r.json());
  const user2 = await fetch("https://jsonplaceholder.typicode.com/users/2").then((r) => r.json());
  const user3 = await fetch("https://jsonplaceholder.typicode.com/users/3").then((r) => r.json());
  console.log([user1.name, user2.name, user3.name]);
}

// loadThreeUsers(); // works, but slower than it needs to be — fix it above
