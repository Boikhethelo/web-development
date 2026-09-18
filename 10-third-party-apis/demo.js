/**
 * demo.js — Third-party APIs (Open-Meteo)
 *
 * Two-step real-world pattern: first geocode the city name to lat/lon
 * (one API endpoint), then fetch weather for those coordinates (a second
 * endpoint). This is common with real APIs — you often chain more than one
 * request together to get what you actually want.
 */

const statusEl = document.getElementById("status");
const outputEl = document.getElementById("weather-output");

async function getCoordinates(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Geocoding failed: HTTP ${response.status}`);
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`No location found for "${cityName}"`);
  }
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}

async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Weather fetch failed: HTTP ${response.status}`);
  const data = await response.json();
  return data.current_weather; // { temperature, windspeed, weathercode, ... }
}

async function loadWeatherFor(cityName) {
  statusEl.textContent = "Looking up city...";
  statusEl.classList.remove("error");
  outputEl.innerHTML = "";

  try {
    const place = await getCoordinates(cityName);
    statusEl.textContent = `Found ${place.name}, ${place.country}. Fetching weather...`;

    const weather = await getWeather(place.latitude, place.longitude);
    statusEl.textContent = "";

    outputEl.innerHTML = `
      <div class="weather-card">
        <div class="temp">${weather.temperature}°C</div>
        <div class="desc">${place.name}, ${place.country} — wind ${weather.windspeed} km/h</div>
      </div>
    `;
  } catch (error) {
    statusEl.textContent = error.message;
    statusEl.classList.add("error");
  }
}

document.getElementById("city-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city-input").value.trim();
  if (city) loadWeatherFor(city);
});

loadWeatherFor("Cape Town"); // load something on first open
