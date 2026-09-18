/**
 * demo.js — Events
 */

// --- Click event with running count ----------------------------------------
let clickCount = 0;
const clickZone = document.getElementById("click-zone");
const clickCountEl = document.getElementById("click-count");

clickZone.addEventListener("click", () => {
  clickCount++;
  clickCountEl.textContent = clickCount;
});

// --- Input event (fires on every keystroke) --------------------------------
const keyInput = document.getElementById("key-input");
const keyLog = document.getElementById("key-log");

keyInput.addEventListener("input", (event) => {
  // event.target is the element the event happened on — here, keyInput itself
  keyLog.textContent = event.target.value;
});

// --- Submit event with preventDefault + basic validation --------------------
const form = document.getElementById("signup-form");
const emailInput = document.getElementById("email-input");
const formError = document.getElementById("form-error");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stops the browser's default "reload the page" behaviour

  const email = emailInput.value;
  if (!email.includes("@")) {
    formError.textContent = "That doesn't look like a valid email.";
    return;
  }

  formError.textContent = "";
  console.log("Would submit:", email); // in folder 09/10 this becomes a real fetch() call
  emailInput.value = "";
});
