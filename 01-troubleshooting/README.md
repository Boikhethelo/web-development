# 01 — Troubleshooting JavaScript

## What this is
The single most useful JS skill isn't a language feature — it's being able to
read an error message, find the line it points to, and figure out why the
computer is confused. Every folder after this one assumes you can do this.

## Why it comes first
Once you write real JS (even two lines), you *will* hit errors. If you don't
know how to read them, every other concept in this repo becomes "copy code,
hope it works, give up if it doesn't." This folder exists so that from here on,
an error is information, not a dead end.

## The three error types you'll meet constantly
- **SyntaxError** — the code isn't even valid JS (missing bracket, typo in a
  keyword). The script won't run *at all* until this is fixed.
- **ReferenceError** — you used a variable/function name that doesn't exist
  (yet, or ever — often a typo, or using something before it's declared).
- **TypeError** — the *shape* of the value isn't what you assumed (calling
  `.map()` on something that isn't an array, reading a property of `null`).

## Tools you'll use in every other folder
- `console.log(value)` — print a value to see what it actually is.
- `console.table(arrayOfObjects)` — print an array of objects as a table.
- `console.error(msg)` — same as log but styled as an error, useful for
  flagging real problems vs. debug output.
- The **debugger** — open DevTools (F12) → Sources tab, click a line number to
  set a breakpoint, reload the page, and the browser will pause execution there
  so you can inspect variables. You can also write the word `debugger;` directly
  in your code to force a pause at that line.
- `try { ... } catch (error) { ... }` — lets your code catch an error instead
  of crashing, and inspect it. You'll use this heavily once you reach `07
  working with APIs` — network requests fail in ways you can't prevent, only
  handle gracefully.

## How this connects forward
Every later demo.js in this repo is written the way real JS is written: it
will occasionally throw something at you if you edit the exercises carelessly.
That's intentional — treat every red line in the console as this folder's
lesson repeating itself.
