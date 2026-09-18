/**
 * Exercise 1 — fetch a single resource and handle a 404
 *
 * TODO:
 * 1. Write an async function `loadUser(id)` that fetches
 *    `https://jsonplaceholder.typicode.com/users/${id}`
 * 2. Check response.ok — if false, throw an Error including response.status
 * 3. Parse the JSON body and log the user's `name` and `email`
 * 4. Wrap the whole thing in try/catch and console.error on failure
 * 5. Call loadUser(1) — should succeed
 * 6. Call loadUser(9999) — should hit your error handling
 *    (this endpoint returns 404 for ids that don't exist)
 */

async function loadUser(id) {
  // your code here
}

// loadUser(1);
// loadUser(9999);
