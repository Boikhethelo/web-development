# 07 — Working with APIs

## What this is
An API (Application Programming Interface) here means a **web API** — a
server somewhere that accepts HTTP requests and sends back data, usually as
JSON (folder `06`). JS talks to APIs using `fetch()`, the built-in function
for making HTTP requests from the browser.

## The basic shape of a request
```js
fetch("https://example.com/api/users")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json(); // parses the JSON body — returns ANOTHER promise
  })
  .then((data) => {
    console.log(data); // now a real JS object/array
  })
  .catch((error) => {
    console.error("Request failed:", error); // folder 01's try/catch pattern, network edition
  });
```
`fetch()` returns a **Promise** (folder `15` covers what that actually means
in depth — for now, treat `.then()` as "when this finishes successfully, run
this next" and `.catch()` as "if anything in the chain failed, run this
instead"). This same request, written with `async/await` (folder `16`):
```js
async function loadUsers() {
  try {
    const response = await fetch("https://example.com/api/users");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Request failed:", error);
  }
}
```
Both do exactly the same thing — async/await is just easier to read once
you're chaining multiple steps.

## Status codes worth knowing
- `200` OK, `201` Created — success
- `400` Bad Request — you sent something the server didn't accept
- `401`/`403` — not authenticated / not allowed (common with third-party APIs
  that need an API key — folder `10`)
- `404` Not Found
- `500` — the server itself broke, not your fault

Important gotcha: `fetch()` only rejects (goes to `.catch`) on a genuine
network failure (offline, DNS failure). A `404` or `500` response still
"succeeds" as far as `fetch` is concerned — that's why you always check
`response.ok` yourself.

## HTTP methods
- `GET` — read data (the default if you don't specify a method)
- `POST` — create something new, usually with a JSON body
- `PUT`/`PATCH` — update something existing
- `DELETE` — remove something

## How this connects forward
- `09 AJAX` — the *pattern* this folder demonstrates (update the page without
  a full reload) is what "AJAX" refers to as a whole.
- `10 third-party APIs` — the exact same `fetch()` calls, pointed at a real
  public API instead of a placeholder one.
