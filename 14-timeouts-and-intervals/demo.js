/**
 * demo.js — Timeouts and Intervals
 */

const countdownEl = document.getElementById("countdown");
let secondsLeft = 10;
let intervalId = null; // must be stored, otherwise clearInterval has nothing to target

function render() {
  countdownEl.textContent = secondsLeft;
  countdownEl.classList.toggle("urgent", secondsLeft <= 3 && secondsLeft > 0);
}

document.getElementById("start-btn").addEventListener("click", () => {
  if (intervalId !== null) return; // already running, don't start a second one

  intervalId = setInterval(() => {
    secondsLeft--;
    render();

    if (secondsLeft <= 0) {
      clearInterval(intervalId); // the only way to actually stop a running interval
      intervalId = null;
      countdownEl.textContent = "Done!";
      countdownEl.classList.remove("urgent");
    }
  }, 1000);
});

document.getElementById("stop-btn").addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

document.getElementById("reset-btn").addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  secondsLeft = 10;
  render();
});

/**
 * A Promise-wrapped delay — the bridge to folders 15 and 16. Not used
 * elsewhere in this demo, but shown here because this exact pattern is
 * how setTimeout becomes usable with `await`.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

render();
