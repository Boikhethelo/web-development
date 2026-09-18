/**
 * storage.js — Cookies (folder 11) + Client-side storage (folder 12)
 *
 * Small, reusable helpers. Nothing else in this app talks to
 * document.cookie or localStorage directly — everything goes through here,
 * so if the storage mechanism ever changed, only this file would need to.
 */

// --- Cookies: used for the "remember my name" greeting ----------------------

function getCookie(name) {
  const match = document.cookie
    .split(";")
    .map((pair) => pair.trim())
    .find((pair) => pair.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function setCookie(name, value, maxAgeSeconds) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/`;
}

// --- localStorage: used for notes and theme preference ----------------------

const NOTES_KEY = "dashboard-notes";
const THEME_KEY = "dashboard-theme";

/** Returns the saved notes array, or [] if nothing is stored yet. */
function loadNotes() {
  const raw = localStorage.getItem(NOTES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
