/**
 * Exercise 1 — extend the weather demo with a forecast + error handling
 *
 * TODO:
 * 1. Write an async function `getForecast(latitude, longitude)` that
 *    fetches from:
 *    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
 *    — this returns a `daily` object with arrays: `time`, `temperature_2m_max`,
 *    `temperature_2m_min`. Return `data.daily`.
 *
 * 2. Write an async function `renderForecast(cityLat, cityLon)` that calls
 *    getForecast, then builds one <p> per day into #output showing the date
 *    and the min/max temperature, e.g. "2026-09-14: 12°C - 21°C"
 *
 * 3. Handle the case where the fetch fails (bad coordinates, network issue,
 *    non-ok response) by showing a message in #status instead of crashing.
 *
 * 4. Call renderForecast with Cape Town's coordinates to test:
 *    latitude -33.9249, longitude 18.4241
 *
 * This deliberately skips the geocoding step from demo.js — you're given
 * coordinates directly, so focus on the fetch + error handling + DOM build.
 */

async function getForecast(latitude, longitude) {
  // your code here
}

async function renderForecast(latitude, longitude) {
  // your code here
}

// renderForecast(-33.9249, 18.4241);
