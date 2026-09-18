/**
 * demo.js — Promises
 */

const logEl = document.getElementById("log");
const stateBadge = document.getElementById("state-badge");

function log(line) {
  logEl.textContent += line + "\n";
}

/** A promise that randomly resolves or rejects after a short delay. */
function rollTheDice() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const roll = Math.ceil(Math.random() * 6);
      if (roll >= 4) {
        resolve(roll); // fulfilled
      } else {
        reject(new Error(`Rolled a ${roll} — too low`)); // rejected
      }
    }, 800);
  });
}

document.getElementById("run-btn").addEventListener("click", () => {
  stateBadge.textContent = "pending";
  stateBadge.className = "state pending";
  log("Rolling...");

  rollTheDice()
    .then((roll) => {
      stateBadge.textContent = "fulfilled";
      stateBadge.className = "state fulfilled";
      log(`Success! Rolled a ${roll}`);
    })
    .catch((error) => {
      stateBadge.textContent = "rejected";
      stateBadge.className = "state rejected";
      log(`Failed: ${error.message}`);
    })
    .finally(() => {
      log("(this always runs, win or lose)\n");
    });
});

/** A fake "request" that resolves after a random delay, for Promise.all demo. */
function fakeRequest(label, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${label} done`), ms);
  });
}

document.getElementById("all-btn").addEventListener("click", () => {
  log("Starting 3 requests in parallel...");
  const start = Date.now();

  Promise.all([
    fakeRequest("Request A", 600),
    fakeRequest("Request B", 900),
    fakeRequest("Request C", 400),
  ]).then((results) => {
    const elapsed = Date.now() - start;
    log(`All done in ~${elapsed}ms (NOT 600+900+400 — they ran together): ${results.join(", ")}\n`);
  });
});
