# 15 — Promises

## What this is
A Promise is an object representing a value that doesn't exist yet, but
will — either successfully (**fulfilled**) or not (**rejected**). It's the
mechanism `fetch()` has been returning this whole time (folders `07`, `09`,
`10`), and it's what `async/await` (folder `16`) is built on top of.

## The three states
A promise starts **pending**, and settles exactly once into either:
- **fulfilled** — the operation succeeded, a value is available
- **rejected** — the operation failed, a reason (usually an Error) is available

## Creating one
```js
const promise = new Promise((resolve, reject) => {
  const success = doSomethingRisky();
  if (success) {
    resolve(someValue);   // moves to fulfilled
  } else {
    reject(new Error("it broke")); // moves to rejected
  }
});
```
In practice you'll consume promises (from `fetch`, from libraries) far more
often than construct them by hand — the main exception is wrapping an
older callback-based API, exactly like folder `14`'s `delay(ms)` helper:
```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

## Consuming: `.then()`, `.catch()`, `.finally()`
```js
fetchSomething()
  .then((result) => processResult(result))   // runs on success
  .catch((error) => handleError(error))       // runs on failure, anywhere above
  .finally(() => hideLoadingSpinner());        // runs either way
```
`.then()` calls chain — each one receives the *return value* of the previous
one, which is what lets you build a multi-step pipeline instead of nesting
callbacks inside callbacks.

## Running promises together
```js
// waits for ALL to finish, rejects immediately if ANY one rejects
const [a, b] = await Promise.all([fetchA(), fetchB()]);

// resolves/rejects as soon as the FIRST one settles, ignores the rest
const first = await Promise.race([fetchA(), fetchB()]);
```
`Promise.all` matters once you need several independent requests at once
(e.g. the capstone project fetching weather and a joke API in parallel
rather than one after another).

## How this connects forward
- `16 async/await` — `await` literally means "pause here until this promise
  settles" — same mechanism, more readable syntax.
