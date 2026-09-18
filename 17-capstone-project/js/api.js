/**
 * api.js — Working with APIs (07), Third-party APIs (10), Promises (15),
 * Async/await (16), JSON (06), Troubleshooting (01)
 *
 * Every network call lives in this one file, all async/await, all wrapped
 * in try/catch. Nothing in here touches the DOM — these functions just
 * fetch data and return it, or throw a clear error. app.js is responsible
 * for deciding what to do with the result.
 */

/** Geocodes a city name to coordinates, then fetches current weather for it. */
async function fetchWeather(cityName) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
  const geoResponse = await fetch(geoUrl);
  if (!geoResponse.ok) throw new Error(`Geocoding failed: HTTP ${geoResponse.status}`);

  const geoData = await geoResponse.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`No location found for "${cityName}"`);
  }
  const { latitude, longitude, name, country } = geoData.results[0];

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const weatherResponse = await fetch(weatherUrl);
  if (!weatherResponse.ok) throw new Error(`Weather fetch failed: HTTP ${weatherResponse.status}`);

  const weatherData = await weatherResponse.json();
  return {
    place: `${name}, ${country}`,
    temperature: weatherData.current_weather.temperature,
    windspeed: weatherData.current_weather.windspeed,
  };
}

/** Fetches a random quote from a free, no-key-required quote API. */
async function fetchQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random");
  if (!response.ok) throw new Error(`Quote fetch failed: HTTP ${response.status}`);
  const data = await response.json();
  return { text: data.quote, author: data.author };
}
