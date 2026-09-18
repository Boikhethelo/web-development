# 09 — AJAX

## What this is
AJAX (Asynchronous JavaScript And XML) is not a tool or a function — it's the
**name of a pattern**: update part of a page with server data *without*
reloading the whole page. The "XML" in the name is historical — almost
nobody sends XML anymore, everyone uses JSON (folder `06`), but the acronym
stuck. You already built AJAX in folder `07` and `08` without the name
attached: fetching data with `fetch()` and inserting it into the DOM *is*
AJAX. This folder exists to name the pattern explicitly and show the older
tool (`XMLHttpRequest`) you'll still occasionally see in older code/tutorials.

## The pattern, explicitly
1. Something happens (a click, page load, a timer)
2. JS sends a request to a server *in the background*
3. The rest of the page stays interactive while waiting
4. When the response arrives, JS updates *only* the relevant part of the DOM

## `fetch()` vs the older `XMLHttpRequest`
`fetch()` (what you used in folder 07) is the modern way. `XMLHttpRequest`
(XHR) is the original AJAX mechanism, callback-based rather than
promise-based, and considerably more verbose:
```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
xhr.onload = () => {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.onerror = () => console.error("Request failed");
xhr.send();
```
You're very unlikely to need to write XHR yourself — it's shown here purely
so that if you see it in a tutorial or an old codebase, you recognise it as
"an older way to do what `fetch` does" rather than something new.

## Why "asynchronous" matters here specifically
The whole point of AJAX is that step 2 doesn't freeze the page. This only
works because `fetch` (and XHR) are asynchronous — this is the direct bridge
into folder `13`, which explains *why* JS can do this at all.

## How this connects forward
- `13 asynchronous programming` — the mechanism that makes "don't freeze the
  page while waiting" possible in the first place.
- `10 third-party APIs` — the same AJAX pattern, pointed at a real, live
  public API instead of a placeholder one.
