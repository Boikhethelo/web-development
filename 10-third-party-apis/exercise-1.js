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
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.daily) {
        throw new Error("No daily forecast data available.");
    }

    return data.daily;
}

async function renderForecast(cityLat, cityLon) {
    const output = document.getElementById("weather-output");
    const status = document.getElementById("status");

    try {
        if (status) status.textContent = "Loading forecast...";
        if (output) output.replaceChildren(); // Clear any previous forecast

        const daily = await getForecast(cityLat, cityLon);

        const fragment = document.createDocumentFragment();

        // Loop through each day using the index to read matching min/max temps
        daily.time.forEach((date, i) => {
            const minTemp = Math.round(daily.temperature_2m_min[i]);
            const maxTemp = Math.round(daily.temperature_2m_max[i]);

            const p = document.createElement("p");
            p.textContent = `${date}: ${minTemp}°C - ${maxTemp}°C`;
            fragment.appendChild(p);
        });

        output.appendChild(fragment);
        if (status) status.textContent = ""; // Clear loading message on success
    } catch (error) {
        if (status) {
            status.textContent = `Failed to load forecast: ${error.message}`;
        }
        console.error("renderForecast failed:", error);
    }
}

// Test with Cape Town coordinates
renderForecast(-33.9249, 18.4241);
