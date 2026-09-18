# 14 — Timeouts and Intervals

## What this is
The oldest form of scheduled asynchronous code in JS (folder `13`'s
callback style). `setTimeout` runs something once, after a delay.
`setInterval` runs something repeatedly, every N milliseconds, until you
explicitly stop it.

## Syntax
```js
const timeoutId = setTimeout(() => {
  console.log("Runs once, ~1000ms later");
}, 1000);
clearTimeout(timeoutId); // cancels it, if it hasn't run yet

const intervalId = setInterval(() => {
  console.log("Runs every 1000ms, forever");
}, 1000);
clearInterval(intervalId); // the ONLY way to stop it — otherwise it runs forever
```
**Always keep the returned id if you might need to cancel it.** A common bug
is starting an interval (e.g. on a button click) without storing its id
anywhere, making it impossible to stop later — it just keeps running in the
background.

## The delay is a minimum, not a guarantee
`setTimeout(fn, 1000)` means "run this no sooner than 1000ms from now" — if
the call stack is busy with other synchronous code when that time arrives,
the callback waits until the stack is free (folder `13`'s event loop again).
For UI timers this is rarely noticeable; worth knowing it isn't a hard
real-time guarantee.

## The `this` gotcha, revisited
If you pass a class method directly to `setTimeout`, it loses its `this`
binding exactly the way it did in folder `04`'s exercise 2 — wrap it in an
arrow function (`setTimeout(() => obj.method(), 1000)`) to keep `this`
pointing at the right object.

## How this connects forward
- `15 promises` — you can wrap a `setTimeout` in a Promise to create a
  reusable `delay(ms)` helper, which becomes genuinely useful once combined
  with `async/await` (folder `16`) — this demo builds exactly that helper.
