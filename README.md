# JavaScript, Learned By Doing

You already have a working handle on HTML and CSS from MDN. This repo skips the
"read a long article" approach and replaces it with the format that tends to work
better once the fundamentals are in place: **a short explanation, a working demo
you can open and poke at, and exercises where you write the code yourself.**

Because you're coming from a solid Java OOP background (encapsulation, inheritance,
polymorphism, Maven/JUnit workflow), a few folders below (especially `04` and `05`)
deliberately draw comparisons to Java so you can map new syntax onto concepts you
already understand rather than learning them from zero.

## How every folder is structured

```
NN-concept-name/
  README.md         <- what the concept is, why it matters, how it connects to
                        the concepts before/after it
  index.html         <- a small working demo page (HTML only has doc-comments,
                        no inline JS/CSS — everything is linked externally)
  style.css           <- the demo's styling, every rule commented so the CSS
                        itself teaches you something on the way past
  demo.js            <- the working JS that makes index.html do something,
                        heavily commented (JSDoc-style) so you can read it
                        as a second explanation of the concept
  exercises.html      <- a bare page that links the exercise files below
  exercise-1.js        <- a task for you to solve, with instructions as
  exercise-2.js           comments and TODOs, no solution included
  (exercise-3.js)
```

**Workflow for each folder:**
1. Read `README.md`.
2. Open `index.html` in a browser (or VS Code's Live Server extension), then open
   `demo.js` alongside it and read the two together.
3. Open `exercises.html` and `exercise-1.js`/`exercise-2.js`, and actually write
   the code — don't just read the TODOs.
4. Open the browser dev console (F12) while you work. Getting comfortable reading
   console errors is itself the subject of folder `01`.

JS is never written inline in the HTML anywhere in this repo — every page links
an external `.js` file with `<script src="..." defer></script>`. That's the
"good practice" you asked to keep to, and it also means the browser console will
give you file names and line numbers that actually correspond to what you wrote.

## Suggested order

The folders are numbered in a deliberate build-up, not alphabetically:

1. **01 troubleshooting** — read the console before anything else exists to debug
2. **02 functions and methods** — the basic unit of JS logic
3. **03 events** — how the browser tells your code something happened
4. **04 object-oriented JS** — objects, `this`, prototypes (vs. Java classes)
5. **05 inheritance** — prototype chains and `class extends` (vs. Java `extends`)
6. **06 JSON** — the data format everything from here on speaks
7. **07 working with APIs** — `fetch`, requests/responses, status codes
8. **08 manipulating the DOM** — reading/writing the page from JS
9. **09 AJAX** — the *pattern* of updating a page without a reload (fetch is one implementation)
10. **10 third-party APIs** — using someone else's live API for real
11. **11 cookies** — small, server-visible, expiring client storage
12. **12 client-side storage** — `localStorage`/`sessionStorage`, no server involved
13. **13 asynchronous programming** — why any of the async stuff below is needed
14. **14 timeouts and intervals** — the oldest form of async scheduling in JS
15. **15 promises** — the modern object representing "a value, eventually"
16. **16 async/await** — syntax sugar over promises that reads like sync code
17. **17 capstone project** — a small weather + notes dashboard that uses all of it

Work through them in order the first time. After that, treat each folder as a
standalone reference you can come back to.
