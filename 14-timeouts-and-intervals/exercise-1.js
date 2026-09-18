/**
 * Exercise 1 — a self-dismissing "toast" message
 *
 * TODO: on #toast-btn click:
 * 1. Set #toast's textContent to "Saved!"
 * 2. Use setTimeout to clear #toast's textContent back to "" after 2000ms
 * 3. Bonus: if the button is clicked again before the 2 seconds are up,
 *    the OLD timeout should be cancelled first (clearTimeout) so the text
 *    doesn't disappear early or flicker — store the timeout id in a
 *    variable outside the click handler so it persists between clicks.
 */

const toast = document.getElementById("toast");
let toastTimeoutId = null;

document.getElementById("toast-btn").addEventListener("click", () => {
  // your code here
});
