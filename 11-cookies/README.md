# 11 — Cookies

## What this is
A cookie is a small piece of text (max ~4KB) stored by the browser, tied to a
specific site, that gets **automatically sent to the server with every HTTP
request** to that site. That last part is what makes cookies different from
everything in folder `12` — cookies exist primarily for the *server* to
recognise a returning browser (sessions, logins), not just for JS to
remember something locally.

## Reading and writing cookies from JS
```js
// write — a single string, semicolon-separated key=value pairs
document.cookie = "username=Mogs; max-age=3600; path=/";

// read — ALL cookies come back as ONE string, you parse it yourself
console.log(document.cookie); // "username=Mogs; theme=dark"
```
There's no `document.getCookie("username")` — you get one long string and
have to split it apart, which is why the demo below includes a small parser
function. This is worth knowing as a quirk of the API, not something to
over-think.

## Key attributes
- `max-age=3600` — expires in seconds from now (alternative: `expires=` with
  a date string)
- `path=/` — which URL paths the cookie is sent on
- `Secure` — only sent over HTTPS
- `HttpOnly` — **cannot** be set or read from JS at all (only the server can
  set this one) — used for sensitive session cookies specifically so
  client-side JS (and any XSS attack) can't read them

## Deleting a cookie
There's no delete method either — you overwrite it with an already-expired
`max-age`:
```js
document.cookie = "username=; max-age=0; path=/";
```

## Cookies vs. client-side storage (next folder)
| | Cookies | localStorage/sessionStorage |
|---|---|---|
| Sent to server automatically | Yes | No |
| Size limit | ~4KB | ~5-10MB |
| Expiry | You set it, or session-only | Persists until cleared (localStorage) |
| Typical use | Login sessions, server-visible prefs | UI state, offline data, big local data |

## How this connects forward
- `12 client-side storage` — same underlying idea (small persisted key/value
  data in the browser) but a purely client-side, much larger version.
