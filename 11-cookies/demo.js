/**
 * demo.js — Cookies
 */

/** Parses document.cookie's single string into a { key: value } object. */
function parseCookies() {
  const cookies = {};
  document.cookie.split(";").forEach((pair) => {
    const [key, value] = pair.split("=").map((s) => s.trim());
    if (key) cookies[key] = decodeURIComponent(value || "");
  });
  return cookies;
}

function showCookies() {
  const cookies = parseCookies();
  document.getElementById("cookie-display").textContent =
    Object.keys(cookies).length > 0
      ? JSON.stringify(cookies, null, 2) // folder 06 — JSON for readable display
      : "(no cookies set)";
}

document.getElementById("set-btn").addEventListener("click", () => {
  const name = document.getElementById("name-input").value.trim();
  if (!name) return;
  // max-age=3600 -> expires in 1 hour; path=/ -> valid across the whole site
  document.cookie = `username=${encodeURIComponent(name)}; max-age=3600; path=/`;
  showCookies();
});

document.getElementById("delete-btn").addEventListener("click", () => {
  // Overwrite with max-age=0 — this is how you "delete" a cookie, there's
  // no dedicated delete method in the cookie API.
  document.cookie = "username=; max-age=0; path=/";
  showCookies();
});

document.getElementById("refresh-btn").addEventListener("click", showCookies);

showCookies(); // show whatever's already there on page load
