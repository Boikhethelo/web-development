# 17 — Capstone Project: Daily Dashboard

A single small app that deliberately pulls in every concept from folders
`01`–`16`, so you can see them working together instead of in isolation.

## What it is
A "daily dashboard" page with three panels:
1. **Weather** — live weather for a city you type, via the Open-Meteo API
   (same API as folder `10`).
2. **Quote of the moment** — a random quote from a public API, auto-refreshing
   on a timer, with a manual refresh button.
3. **Notes** — a small to-do/notes list that persists across reloads.

Plus a header that remembers your name across visits using a cookie, and a
theme toggle that persists using `localStorage`.

## Where each concept from this repo shows up

| Concept | Where |
|---|---|
| 01 Troubleshooting | `try/catch` around every fetch in `js/api.js`; open the console while using it |
| 02 Functions & methods | throughout, e.g. `formatTemperature()` in `js/api.js` |
| 03 Events | every button/input listener in `js/app.js` |
| 04 OOP | `Widget` base class and `NoteManager` class in `js/models.js` |
| 05 Inheritance | `WeatherWidget extends Widget`, `QuoteWidget extends Widget` |
| 06 JSON | notes array is `JSON.stringify`/`parse`'d to/from `localStorage` |
| 07 Working with APIs | `fetchWeather()` in `js/api.js` |
| 08 Manipulating the DOM | `render()` methods build/update DOM elements directly |
| 09 AJAX | the whole dashboard updates without ever reloading the page |
| 10 Third-party APIs | Open-Meteo (weather) and quotable-style quote API (quote) |
| 11 Cookies | the greeting remembers your name via `document.cookie` |
| 12 Client-side storage | notes list + theme preference in `localStorage` |
| 13 Asynchronous programming | the whole app is non-blocking — panels load independently |
| 14 Timeouts & intervals | quote auto-refreshes every 30s via `setInterval` |
| 15 Promises | `Promise.all` used to load weather + quote together on first load |
| 16 Async/await | every fetch in `js/api.js` is written async/await style |

## File layout
```
17-capstone-project/
  index.html      structure only, no inline JS/CSS
  style.css        all styling, commented
  js/
    storage.js     cookie + localStorage helpers (folders 11, 12)
    api.js         all fetch calls, async/await, try/catch (folders 06, 07, 10, 16)
    models.js       Widget base class + subclasses + NoteManager (folders 04, 05)
    app.js          wires it all together: events, timers, initial load (folders 03, 08, 09, 13, 14, 15)
```
Scripts are loaded in that order as plain `<script defer>` tags (not ES
modules) so it runs by just opening `index.html` in a browser — no build
step or local server required, though a Live Server-style tool works too if
you prefer.

## How to use this as a learning exercise
1. Open `index.html` and use the dashboard normally first.
2. Read the files in the order listed above — each one leans on the one
   before it, same as the folder numbering through this whole repo.
3. Then extend it yourself. A few ideas, roughly increasing in difficulty:
   - Add a second cookie that remembers the last city you searched, and
     pre-fill the weather input with it on load.
   - Add a "clear completed notes" button.
   - Add a loading spinner class, toggled the same way `.loading` was used
     in folder `09`.
   - Add a `JokeWidget` that extends `Widget` alongside `WeatherWidget` and
     `QuoteWidget`, using a third public API of your choice.
   - Make the notes list support marking a note "done" (reuse the
     `classList.toggle` pattern from folder `08`'s exercise).
