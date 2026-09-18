# 03 — Events

## What this is
An **event** is the browser telling your code "something happened" — a click,
a key press, the page finishing loading, a form being submitted. JS reacts to
events with **event listeners**: "when X happens on this element, run this
function." This is what turns a static page into an interactive one, and it's
the mechanism `02 functions and methods` was building toward — the function
you pass to `addEventListener` is exactly a function like the ones from that
folder.

## Core pattern
```js
element.addEventListener("click", function (event) {
  // event.target -> the exact element that triggered this
  // event.preventDefault() -> stop the browser's default behaviour
  //   (e.g. stop a form actually submitting/reloading the page)
});
```

## Common event types
- `click`, `dblclick` — mouse
- `keydown`, `keyup`, `input` — keyboard/typing (`input` fires on every
  keystroke in a text field, `change` fires once focus leaves it)
- `submit` — on a `<form>`, fires when submitted (almost always paired with
  `event.preventDefault()` so you can handle it in JS instead of reloading)
- `DOMContentLoaded` — fires once the HTML is fully parsed; useful if you
  ever *don't* use `defer` on your script tag
- `load` — fires once the page (including images) has fully loaded

## Event delegation
Instead of attaching a listener to every single item in a list, attach ONE
listener to their shared parent and check `event.target` inside it. This
matters once you're generating DOM elements dynamically (`08 manipulating the
DOM`) — elements created after page load don't have listeners unless you
either re-attach them or delegate from a parent that was always there.

## How this connects forward
- `08 manipulating the DOM` — events are usually what *triggers* a DOM update.
- `09 AJAX` / `10 third-party APIs` — a button click is typically what kicks
  off a `fetch()` request.
- `14 timeouts and intervals` — scheduled callbacks are a cousin of event
  listeners: both are "run this function later, when something happens."
