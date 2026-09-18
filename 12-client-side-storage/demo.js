/**
 * demo.js — Client-Side Storage
 */

const STORAGE_KEY = "demo-settings";
const defaults = { theme: "light", fontSize: 16 };

/** Reads settings from localStorage, falling back to defaults if none saved. */
function loadSettings() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { ...defaults };
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  renderStorageDisplay();
}

function applySettings(settings) {
  document.body.classList.toggle("theme-dark", settings.theme === "dark");
  document.body.style.fontSize = `${settings.fontSize}px`;

  document.getElementById("theme-select").value = settings.theme;
  document.getElementById("font-size-input").value = settings.fontSize;
  document.getElementById("font-size-value").textContent = settings.fontSize;
}

function renderStorageDisplay() {
  document.getElementById("storage-display").textContent =
    localStorage.getItem(STORAGE_KEY) || "(nothing stored yet)";
}

let settings = loadSettings();
applySettings(settings);
renderStorageDisplay();

document.getElementById("theme-select").addEventListener("change", (event) => {
  settings.theme = event.target.value;
  applySettings(settings);
  saveSettings(settings);
});

document.getElementById("font-size-input").addEventListener("input", (event) => {
  settings.fontSize = Number(event.target.value);
  applySettings(settings);
  saveSettings(settings);
});

document.getElementById("reset-btn").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  settings = { ...defaults };
  applySettings(settings);
  renderStorageDisplay();
});
