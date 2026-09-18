# 06 — JSON

## What this is
JSON (JavaScript Object Notation) is a **text format** for representing data
— objects, arrays, strings, numbers, booleans, `null`. It *looks* like a JS
object literal but it is not JS — it's plain text that any language can read
and write, which is exactly why it's the universal format APIs use to send
data around. From here on almost every folder involves JSON in some form.

## The two conversions you'll use constantly
```js
const obj = { name: "Mogs", track: "AWS Cloud" };

// object -> JSON string, e.g. for sending in a request body or saving to storage
const jsonString = JSON.stringify(obj);
// '{"name":"Mogs","track":"AWS Cloud"}'

// JSON string -> object, e.g. after receiving data from an API
const parsed = JSON.parse(jsonString);
// { name: "Mogs", track: "AWS Cloud" }
```

## Rules that trip people up
- Keys MUST be double-quoted strings — `{"name": "x"}`, not `{name: "x"}`.
- No trailing commas — `{"a": 1,}` is invalid JSON (this will feel familiar —
  it's the same category of bug as the trailing-comma SQL issue you've hit
  before, just in a different syntax).
- No comments allowed in JSON at all.
- `undefined`, functions, and `Symbol` values are silently dropped by
  `JSON.stringify` — only JSON-safe values survive.
- A malformed JSON string will make `JSON.parse` throw a `SyntaxError` —
  always something to catch (folder `01`) when the JSON came from outside
  your own code, e.g. from a network response.

## `JSON.stringify` extra arguments (useful for debugging)
```js
JSON.stringify(obj, null, 2); // pretty-prints with 2-space indentation
```

## How this connects forward
- `07 working with APIs` / `10 third-party APIs` — API responses arrive as
  JSON text; you `JSON.parse` them (or `response.json()` does it for you).
- `11 cookies` / `12 client-side storage` — both only store strings, so
  storing anything beyond a plain string means `JSON.stringify` going in and
  `JSON.parse` coming back out.
