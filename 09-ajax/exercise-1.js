/**
 * Exercise 1 — a small AJAX search box
 *
 * Elements already in exercises.html: #user-id-input, #search-btn, #search-result
 *
 * TODO:
 * 1. On #search-btn click, read the number typed into #user-id-input.
 * 2. Show "Loading..." in #search-result while the request is in flight.
 * 3. fetch `https://jsonplaceholder.typicode.com/users/${id}`
 * 4. If response.ok, display the user's name, email, and company name
 *    (post.company.name) inside #search-result — build this with DOM
 *    methods or textContent, not innerHTML with raw values.
 * 5. If the id doesn't exist (response not ok), show a clear error message
 *    instead of a raw crash.
 *
 * This is the exact AJAX pattern from demo.js, just driven by a value the
 * user types instead of a random number.
 */

const input = document.getElementById("user-id-input");
const button = document.getElementById("search-btn");
const result = document.getElementById("search-result");

button.addEventListener("click", async () => {
  // your code here
});
