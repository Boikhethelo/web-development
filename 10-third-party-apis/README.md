# 10 — Using Third-Party APIs

## What this is
Everything up to here (`jsonplaceholder`) was a *practice* API — fake data,
built for learning. A third-party API is a **real** service you don't
control, run by someone else, that your code depends on. The mechanics are
identical to folder `07`/`09` — same `fetch()`, same JSON — but a few real
concerns show up that a placeholder API hides from you.

## What's actually different from a practice API
- **API keys** — many third-party APIs require a key to identify who's
  calling, often sent as a query parameter or an `Authorization` header.
  NEVER commit a real API key to a public repo — in a real project this
  would live in an environment variable or a backend proxy, not in
  client-side JS anyone can view via "View Source."
- **Rate limits** — call too often, too fast, and you get throttled (often a
  `429 Too Many Requests` status).
- **CORS** — some APIs block browser requests from origins they haven't
  allowlisted; you'll see a CORS error in the console, not a normal HTTP
  error, and it can't be fixed from your own JS — it's a server-side
  permission the API owner controls.
- **Real failure modes** — the service can be down, slow, or its response
  shape can change over time. The `try/catch` habit from folder `01` stops
  being optional here.
- **Documentation-first** — you don't guess the response shape, you read the
  API's docs. This demo uses Open-Meteo specifically because it needs no key
  and its docs are short — good for a first real third-party integration.

## How this connects forward
- `13`–`16` (async folders) — real third-party requests are where async
  handling actually matters; a practice API rarely fails, a real one
  eventually will.
- `17 capstone project` — the capstone uses this exact Open-Meteo API for
  its weather panel.
