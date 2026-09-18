/**
 * app.js — Events (03), AJAX pattern (09), Asynchronous programming (13),
 * Timeouts and intervals (14), Promises (15)
 *
 * This file wires everything else together. It doesn't define fetch logic
 * (that's api.js) or the classes (that's models.js) — it creates instances,
 * attaches event listeners, and decides what happens when.
 */

// --- Theme + greeting (cookies + localStorage, folders 11/12) --------------

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
}

let currentTheme = loadTheme(); // storage.js
applyTheme(currentTheme);

document.getElementById("theme-toggle").addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(currentTheme);
  saveTheme(currentTheme); // storage.js
});

// A simple username cookie — in a real app you'd prompt for it; here we
// just demonstrate the read/write/default pattern from folder 11.
const greetingEl = document.getElementById("greeting");
const savedName = getCookie("dashboardUser"); // storage.js
if (!savedName) {
  setCookie("dashboardUser", "there", 60 * 60 * 24 * 30); // 30 days
}
greetingEl.textContent = `Hi ${savedName || "there"} — welcome back.`;

// --- Weather panel (widgets from models.js, fetch from api.js) -------------

const weatherWidget = new WeatherWidget(
  document.getElementById("weather-status"),
  document.getElementById("weather-output")
);

async function loadWeather(city) {
  weatherWidget.setStatus("Loading weather...");
  try {
    const weather = await fetchWeather(city); // api.js
    weatherWidget.clearStatus();
    weatherWidget.render(weather);
  } catch (error) {
    weatherWidget.setStatus(error.message, true);
  }
}

document.getElementById("weather-form").addEventListener("submit", (event) => {
  event.preventDefault(); // folder 03 — no page reload
  const city = document.getElementById("city-input").value.trim();
  if (city) loadWeather(city);
});

// --- Quote panel, with auto-refresh via setInterval (folder 14) ------------

const quoteWidget = new QuoteWidget(
  document.createElement("div"), // status not shown separately for this panel, kept internal
  document.getElementById("quote-text"),
  document.getElementById("quote-author")
);

async function loadQuote() {
  try {
    const quote = await fetchQuote(); // api.js
    quoteWidget.render(quote);
  } catch (error) {
    document.getElementById("quote-text").textContent = `Couldn't load a quote: ${error.message}`;
    document.getElementById("quote-author").textContent = "";
  }
}

document.getElementById("quote-refresh").addEventListener("click", loadQuote);

// Auto-refresh every 30 seconds. Storing the id isn't strictly needed here
// since this interval runs for the page's whole lifetime, but it's kept for
// clarity and because that's the habit worth having (folder 14).
const quoteIntervalId = setInterval(loadQuote, 30000);

// --- Notes panel (folder 06 JSON, folder 08 DOM, folder 12 localStorage) ---

const noteManager = new NoteManager(document.getElementById("notes-list"));
noteManager.render();

document.getElementById("note-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("note-input");
  const text = input.value.trim();
  if (!text) return;
  noteManager.add(text);
  input.value = "";
});

// --- Initial load: weather + quote fetched together (folder 15 Promise.all,
// folder 13 — neither panel blocks the other; both load independently) ----

async function initialLoad() {
  await Promise.all([loadWeather("Cape Town"), loadQuote()]);
}

initialLoad();
