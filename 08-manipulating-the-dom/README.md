# 08 — Manipulating the DOM

## What this is
The DOM (Document Object Model) is the browser's live, in-memory
representation of your HTML — a tree of objects (folder `04`/`05` — these are
genuinely just objects with an inheritance chain). JS can read and change
this tree, and the browser instantly re-renders whatever changed. Every demo
you've built so far in this repo has been doing this already — this folder
is where it gets named properly and gone through deliberately.

## Selecting elements
```js
document.getElementById("id");            // single element by id
document.querySelector(".class");          // first match, any CSS selector
document.querySelectorAll(".class");        // ALL matches, as a NodeList
```

## Reading and changing content
```js
el.textContent = "plain text";     // safe, escapes HTML automatically
el.innerHTML = "<b>bold</b>";      // parses as HTML — never put raw user
                                    // input here, it's an injection risk
el.value;                          // for inputs — the current typed value
```

## Changing structure
```js
const div = document.createElement("div"); // make a new element, detached
div.textContent = "Hello";
parent.appendChild(div);      // attach it
parent.removeChild(div);      // detach it
el.remove();                  // remove an element directly, no parent lookup needed
```

## Changing attributes, classes, and styles
```js
el.setAttribute("data-id", "42");
el.dataset.id;                       // reads data-id as el.dataset.id
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");
el.style.color = "red";              // inline style — prefer toggling a
                                      // class and letting CSS own the styling
```

## A performance note worth knowing early
Every DOM change can trigger the browser to recalculate layout. Rebuilding a
list by setting `.innerHTML = ""` then appending each item (like `04` and `05`
did) is fine for small lists and simple to reason about — it's what you've
been doing already. For larger, frequently-updated lists, building elements
in memory first and appending them together is the more efficient pattern —
worth knowing exists, not something to over-engineer for yet.

## How this connects forward
- `09 AJAX` — fetched data (folder `07`) almost always ends up rendered into
  the DOM using exactly these techniques.
- `13`–`16` (async folders) — DOM updates are frequently the *result* of an
  async operation finishing.
