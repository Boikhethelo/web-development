# 16 — Async/Await

## What this is
`async`/`await` is syntax built directly on top of Promises (folder `15`) —
it doesn't replace them, it lets you *write* promise-based code so it reads
like ordinary top-to-bottom synchronous code, instead of chains of `.then()`.
You've already been using it since folder `07` — this folder is where it
gets explained properly.

## The two keywords
- `async` before a function makes it **always return a Promise**, even if
  you just `return` a plain value inside it (it gets automatically wrapped).
- `await` before a promise **pauses that function** (not the whole page —
  just this one function) until the promise settles, then gives you back
  the resolved value directly, instead of you having to write a `.then()`.
  `await` can only be used inside a function marked `async`.

```js
// Promise chain (folder 15's style)
function loadUser(id) {
  return fetch(`/users/${id}`)
    .then((res) => res.json())
    .then((user) => console.log(user))
    .catch((err) => console.error(err));
}

// Exactly the same behaviour, written with async/await
async function loadUser(id) {
  try {
    const res = await fetch(`/users/${id}`);
    const user = await res.json();
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}
```
Error handling switches from `.catch()` to an ordinary `try/catch` (folder
`01`) — this is a big part of why async/await tends to read more naturally
once you have more than one or two steps to chain.

## Sequential vs. parallel — a common mistake
```js
// SEQUENTIAL — each await waits for the previous one to fully finish first
const a = await fetchA(); // waits here
const b = await fetchB(); // only starts once a is done — slower than needed
                           // if a and b don't depend on each other

// PARALLEL — both requests start immediately, together
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```
If step 2 doesn't need the result of step 1, awaiting them one after another
is a real, easy-to-miss performance mistake — reach for `Promise.all` in
that case, exactly as shown in folder `15`.

## How this connects forward
- `17 capstone project` — written almost entirely in async/await style, the
  same way real-world JS mostly is today.
