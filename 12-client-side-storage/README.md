# 12 — Client-Side Storage

## What this is
`localStorage` and `sessionStorage` are browser APIs for storing key/value
data **entirely in the browser** — nothing gets sent to a server (the key
difference from folder `11`'s cookies). Both store only strings, so
anything more complex goes through `JSON.stringify`/`JSON.parse` (folder
`06`) on the way in and out.

## localStorage vs sessionStorage
| | localStorage | sessionStorage |
|---|---|---|
| Persists after closing the tab | Yes, until explicitly cleared | No, cleared when the tab closes |
| Shared across tabs of the same site | Yes | No — each tab has its own |
| Typical use | Saved preferences, offline drafts, cart contents | Per-tab temporary state |

## The API (identical for both — just swap the object)
```js
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");     // "dark"
localStorage.removeItem("theme");
localStorage.clear();               // wipes everything this site stored
```

## Storing objects/arrays (the pattern you'll use most)
```js
const settings = { theme: "dark", fontSize: 16 };
localStorage.setItem("settings", JSON.stringify(settings));

const raw = localStorage.getItem("settings");
const restored = raw ? JSON.parse(raw) : null; // always guard against null —
                                                 // the key might not exist yet
```

## Limits worth knowing
- ~5-10MB per site (varies by browser) — plenty for text/settings, not for
  large files.
- Synchronous — reading/writing blocks the current script briefly. Fine for
  small data, a real concern only at large scale (not something to worry
  about here).
- Not encrypted — never store passwords, tokens, or anything sensitive here;
  anyone with access to the browser (or a malicious script via XSS) can read
  it directly in DevTools.

## How this connects forward
- `17 capstone project` — the capstone saves user notes and preferences to
  `localStorage` so they survive a page reload, which is the single most
  common real use of this API.
