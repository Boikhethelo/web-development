/**
 * Exercise 2 — start/stop polling with setInterval
 *
 * TODO:
 * 1. On #poll-start click, start a setInterval (every 2000ms) that appends
 *    a new line to #poll-output showing the current time
 *    (new Date().toLocaleTimeString()). Store the interval id.
 * 2. Guard against starting a second interval if one is already running
 *    (the same pattern demo.js used for the countdown).
 * 3. On #poll-stop click, clearInterval using the stored id, and reset the
 *    id back to null so #poll-start can be used again later.
 *
 * This is the shape real polling code takes before you upgrade it to
 * something fetch-based in a later project — the scheduling mechanism is
 * identical either way.
 */

const output = document.getElementById("poll-output");
let pollIntervalId = null;

document.getElementById("poll-start").addEventListener("click", () => {
  // your code here
});

document.getElementById("poll-stop").addEventListener("click", () => {
  // your code here
});
