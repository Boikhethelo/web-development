/**
 * demo.js — Asynchronous Programming
 * Demonstrates that async callbacks run AFTER all synchronous code,
 * regardless of delay length — the event loop rule from the README.
 */

const logEl = document.getElementById("log");
let lines = [];

function log(line) {
  lines.push(line);
  logEl.textContent = lines.join("\n");
}

document.getElementById("run-btn").addEventListener("click", () => {
  lines = [];

  log("1. synchronous — runs immediately");

  setTimeout(() => {
    log("4. setTimeout callback — runs last, AFTER all sync code, even with 0ms delay");
  }, 0);

  Promise.resolve().then(() => {
    // Promise callbacks (microtasks) run before setTimeout callbacks (macrotasks),
    // but still after all synchronous code — a subtlety worth knowing exists,
    // not something to memorise deeply right now.
    log("3. Promise.then callback — runs after sync code, but before setTimeout");
  });

  log("2. synchronous — runs immediately, right after line 1");
});
