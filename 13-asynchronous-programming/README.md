# 13 — Asynchronous Programming

## What this is
JS runs on a **single thread** — one line of code at a time, nothing truly
runs in parallel inside your JS code. If a slow operation (a network request,
a timer, reading a large file) blocked that thread until it finished, the
entire page would freeze — no clicks, no scrolling, nothing — until it was
done. Asynchronous programming is the set of tools JS gives you to hand a
slow operation off, keep the page responsive, and get notified when it's
done. Everything you did with `fetch()` in folders `07`, `09`, `10` was
already asynchronous — this folder explains the mechanism underneath that.

## The event loop, in one paragraph
JS has one **call stack** (what's currently running) and a **task queue**
(finished async work waiting to be handled). When you call something async
(`fetch`, `setTimeout`), JS hands it off to the browser, keeps running the
rest of your code immediately, and only comes back to run your `.then()` /
callback once the current call stack is completely empty. This is why
`console.log` order can surprise you the first time — a `setTimeout(fn, 0)`
still runs *after* all synchronous code below it, never before.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// logs: 1, 3, 2  <- "2" runs last even with a 0ms delay
```

## Three ways JS represents "do this later"
1. **Callbacks** — pass a function to be called when something finishes.
   The original mechanism, still used by `setTimeout`/`setInterval` (folder
   `14`) and older APIs. Gets messy when you chain several ("callback hell").
2. **Promises** — an object representing a value that will exist *eventually*
   (folder `15`). Chainable, better error handling than nested callbacks.
3. **async/await** — syntax that lets you write promise-based code that
   *reads* like ordinary top-to-bottom synchronous code (folder `16`).

All three exist at the same time in JS because the language evolved through
them in that order — you'll see all three in real code, so recognising each
matters more than picking a "favourite."

## How this connects forward
- `14 timeouts and intervals` — the callback-based form, and the oldest.
- `15 promises` — the object underneath `fetch()` and underneath `async`
  functions.
- `16 async/await` — the syntax you'll actually write most often day to day.
