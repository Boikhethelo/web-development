/**
 * Exercise 1 — a "visit counter" cookie
 *
 * TODO:
 * 1. Write a function `getCookie(name)` that parses document.cookie and
 *    returns the value for that name, or null if it doesn't exist.
 * 2. Write a function `setCookie(name, value, maxAgeSeconds)` that sets a
 *    cookie with document.cookie, given a name/value/max-age.
 * 3. On #visit-btn click:
 *    - read the "visitCount" cookie using getCookie
 *    - if it doesn't exist, treat it as 0
 *    - increment it by 1
 *    - save it back with setCookie (make it last 1 day: 86400 seconds)
 *    - show "You've visited 3 times" (using the new count) in #visit-message
 * 4. Click the button several times and confirm the count keeps increasing
 *    even after a page reload (cookies persist until they expire or are
 *    deleted — unlike a plain JS variable, which resets on reload).
 */

function getCookie(name) {
  // your code here
}

function setCookie(name, value, maxAgeSeconds) {
  // your code here
}

document.getElementById("visit-btn").addEventListener("click", () => {
  // your code here
});
