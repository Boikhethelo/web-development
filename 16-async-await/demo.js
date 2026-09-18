/**
 * demo.js — Async/Await
 * Same demo as folder 15's Promise.all, but written with async/await, to
 * make the sequential-vs-parallel difference concrete and timed.
 */

const logEl = document.getElementById("log");
const timingEl = document.getElementById("timing");

function log(line) {
  logEl.textContent += line + "\n";
}

function fakeRequest(label, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(`${label} done`), ms));
}

async function runSequential() {
  logEl.textContent = "";
  const start = Date.now();

  // each await fully completes before the next line even starts
  const a = await fakeRequest("Request A", 500);
  log(a);
  const b = await fakeRequest("Request B", 500);
  log(b);
  const c = await fakeRequest("Request C", 500);
  log(c);

  timingEl.textContent = `Sequential took ~${Date.now() - start}ms (roughly 500+500+500)`;
}

async function runParallel() {
  logEl.textContent = "";
  const start = Date.now();

  // all three start at the same time, we just wait for all to finish
  const [a, b, c] = await Promise.all([
    fakeRequest("Request A", 500),
    fakeRequest("Request B", 500),
    fakeRequest("Request C", 500),
  ]);
  log(a);
  log(b);
  log(c);

  timingEl.textContent = `Parallel took ~${Date.now() - start}ms (roughly just 500, not 1500)`;
}

document.getElementById("sequential-btn").addEventListener("click", runSequential);
document.getElementById("parallel-btn").addEventListener("click", runParallel);
