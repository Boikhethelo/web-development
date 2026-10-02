# Web Dev Formative: Study Guide (160 min)

Covers your three exercises (**single-page-application**, **server-side-ui-exercise / WeShare**, **study-repo mini-project**) plus HTML, CSS and JavaScript. Answers that name a project you built score better than generic ones, so every section ends with a "use it in an answer" hook.

---

## 0. The one idea that ties it together

|  | Server-side UI (WeShare) | Single-page app (Dictionary) |
| --- | --- | --- |
| Who builds the HTML? | **Server** (Thymeleaf fills templates) | **Browser** (JS builds/injects HTML) |
| Navigation | Full page load per click, new GET/POST | No reload; JS swaps content in `#app` |
| Data | Passed to template as a model `Map` | `fetch()` JSON from an API |
| State | Server session (`ctx.sessionAttribute`) | Browser JS variables / URL hash |
| Testing | Selenium hits real pages | Selenium waits for JS to render |
| Trade-off | Simple, SEO-friendly, slower feel | Fast feel, more JS, needs loading/error handling |

---

## 1. Project A: `single-page-application` (Dictionary SPA)

**What it is:** a Javalin server that only serves static files from `/public` (port 5050). All the work is in `public/js/`. The files `app-1` to `app-5b` are a *progression*: each step adds one idea. Know the order.

| Step | New idea | Key code |
| --- | --- | --- |
| **app-1** | Run JS after page loads | `window.addEventListener("load", () => {...})` |
| **app-2** | Call an API | `fetch(url, {method:'GET'}).then(r => r.json()).then(...)`, `JSON.stringify(data, null, 2)` to inspect |
| **app-3a** | Build DOM by hand | `document.createElement`, `el.innerHTML`, `appendChild`, `replaceChildren` |
| **app-3b** | Build HTML as a string | template literal + `definitions.reduce((acc, d) => acc + \` ${d.definition} \`, '')\` |
| **app-3c** | Use a template engine | Handlebars: template in `<script type="text/handlebars-template">`, `Handlebars.compile(text)(data)`, `{{word}}`, `{{#each definitions}}` |
| **app-4** | A form to look up any word | `<form id="lookup-form">`; JS still hard-codes `'code'` (you wire up `submit`) |
| **app-5a** | Menu + client-side routing | `<a href="#/dictionary">`, `location.hash`, `hashchange`, a `routes` array of `{path, handler}` |
| **app-5b** | Router library + jQuery | `new Router({mode:'hash'})`, `router.add('/dictionary', fn)`, `addUriListener()`, `navigateTo()` |

### Concepts to be able to explain

**Why `#` in links?** A `#fragment` change doesn't make the browser request a new page, but it fires `hashchange` and updates `location.hash`. That's how an SPA fakes "pages" without a server round-trip.

**Fetch flow:** `fetch()` returns a **Promise** → first `.then` turns the Response into JSON (also a Promise) → second `.then` gets the data. Nothing after `fetch()` waits for it; that's why rendering happens *inside* the `.then`.

**Three ways to render, and when to pick each:**

1. DOM API (3a): safest and most verbose; `textContent` avoids injecting HTML.
2. String + `innerHTML` (3b): concise but **XSS risk** if the data is untrusted, and the markup is buried in JS.
3. Handlebars (3c): markup lives in HTML, data is separate. `{{ }}` escapes by default (`{{{ }}}` doesn't).

**Data reshaping:** the API returns an array of entries; each has `word`, `phonetic`, `phonetics[]` (audio), `meanings[]` → `partOfSpeech`, `definitions[]` → `definition`, `example`, `synonyms`, `antonyms`. The code flattens `data[0]` into a simple object for the template.

**Form + SPA:** `event.preventDefault()` on `submit` stops the page reload; `new FormData(event.target).get("word")` reads the input by its `name`. The form is injected by the route handler, so `lookupWord()` (which attaches the listener) must run *after* the HTML exists.

**Router pattern (5a):**

```js
const path = location.hash.slice(1).toLowerCase() || '/';
const { handler = defaultRouteHandler } = routes.find(r => r.path == path) || {};
handler();
```

Slice off `#`, find matching route, fall back to a default handler (the "404").

### Tests (Selenium, page-object style)

`MainPage` finds elements **by id/class**: `#app` ("Click on a menu item."), link ids `dictionary`/`synonyms`/`antonyms`, input `#lookup`, form `#lookup-form`, result ids `#word`, `#phonetic`, classes `.part-of-speech`, `.definition`, `.example`, `.related-word`, and an `<audio src>`. It uses `WebDriverWait` because content appears *after* an async fetch. Only `visitMainPage` is enabled; the rest are `@Disabled` and show what the finished app must render. **Lesson: your HTML ids/classes are a contract with the tests.**

### Traps hidden in the code (great for "spot the bug" questions)

- **`app-5a.js` is broken as written:** `window.addEventListener('load', router)` and the `routes` array reference `const` variables *before* their declarations → `ReferenceError` from the **temporal dead zone**. Fix: declare handlers and `router` first, or use function declarations (hoisted).
- The `app-5a.html` comment says "module script" but the tag has no `type="module"`.
- `app-5b.html` loads `app-5a.js`, not `app-5b.js`. Also `app-5b.js` needs `#default-template`, `#dictionary-template`, `#thesaurus-template`, `#results-template` that aren't in that HTML.
- Most steps have **no error handling**: an unknown word returns an object (not an array), so `data[0].word` throws. Fix: check `response.ok`, check `Array.isArray(data)`, add `.catch`.
- `<em>${word}'</em>` has a stray apostrophe; `html = ...` (no `const`) creates an implicit global; `});;` double semicolon.
- Multiple `load` listeners in 3a/3b all fire (that's why the console dump and render both happen).

**Use it in an answer:** "In my SPA, clicking the Dictionary link changed only the hash; my router matched `/dictionary` and injected the form into `#app` without reloading."

---

## 2. Project B: `server-side-ui-exercise` (WeShare, MVC)

**What it is:** a Java/Javalin web app for splitting expenses: log in with an email, record expenses, request payments from others, pay requests you've received. Classic **MVC** with server-rendered Thymeleaf pages.

### Architecture map

| Layer | Where | Job |
| --- | --- | --- |
| **Model** | `weshare.model` (`Expense`, `PaymentRequest`, `Payment`, `Person`) | Business rules (e.g. no future-dated expense, `amountLessPaymentsReceived`) |
| **Persistence** | `ExpenseDAO`/`PersonDAO` + `collectionbased` impls | Store/find objects (in-memory) |
| **Controller** | `weshare.controller.*` (Javalin `Handler` lambdas) | Read request, call model/DAO, choose view or redirect |
| **View** | `resources/templates/*.html` (Thymeleaf) + `html/` static | Render HTML from a model map |
| **Wiring** | `Routes`, `WeShareServer`, `ServiceRegistry` | Map URLs → handlers; look up services by interface |

`ServiceRegistry.lookup(ExpenseDAO.class)` is a **service locator**: controllers ask for an interface, never `new` the implementation, so you could swap the DAO (e.g. for SQLite) without touching controllers.

### Request lifecycle (say this out loud)

Browser sends request → Javalin matches route in `Routes` → **AccessManager** checks session (no logged-in `Person` and path isn't `/` → redirect to login) → controller handler runs → `context.render("expenses.html", Map.of(...))` → Thymeleaf merges model + template (+ `layout.html`) → HTML response.

### Routes

| Method + path | Handler | Notes |
| --- | --- | --- |
| GET `/` | serves `html/index.html` | login page (static) |
| POST `/` | `PersonController.login` | find-or-create by email, store in session, redirect |
| GET `/logout` | `logout` | clears session attribute, redirect |
| GET `/expenses` | `ExpensesController.view` | filters out fully-paid expenses, sums totals |
| GET `/newexpense` | `newExpenseForm` | renders form |
| POST `/expenses` | `createExpense` | parse form, save, redirect |
| GET/POST `/{id}` | `viewForm` / `createPaymentRequest` | **path parameter** (UUID) |
| GET `/paymentrequests_sent`, `_received` | `PaymentRequestController` | list + total outstanding |
| POST `/paymentrequests_received` | `pay` | hidden `id` field; paying creates an expense for the payer |

### Key patterns

- **Post/Redirect/Get (PRG):** after every successful POST, `context.redirect(...)`. Prevents a browser refresh from re-submitting the form (duplicate expense).
- **GET vs POST:** GET reads and is safe to repeat; POST changes state.
- **Form → server:** `<input name="amount">` ↔ `context.formParam("amount")`. The **`name`** attribute is what's sent; `id` is for labels/CSS/tests. `<label for="x">` must match `<input id="x">`.
- **Path vs form vs query params:** `pathParam("id")`, `formParam("email")`, `queryParam(...)`.
- **Sessions:** server remembers you via a cookie; `sessionAttribute(KEY, person)`; `setHttpOnly(true)` hides the cookie from JS (mitigates XSS cookie theft).
- **Route order/specificity:** the catch-all `/{id}` is registered *last* so it doesn't swallow `/expenses`, `/logout`, etc.
- **Global exception handler** renders `exception.html`; note it uses `th:utext` (unescaped) for the stack trace, which is fine for a dev page but a real XSS risk with user data.
- **Input handling:** dates accept `dd/MM/yyyy` with ISO fallback; amount via `Long.parseLong(text.trim())`; blank email rejected via `formParamAsClass(...).check(...)`.
- **Streams in controllers:** `filter(...).toList()`, then `map(Expense::amountLessPaymentsReceived).reduce(ZERO_RANDS, MonetaryAmount::add)`.

### Thymeleaf cheat-sheet

| Attribute | Use |
| --- | --- |
| `th:text="${expense.description}"` | Insert text (**HTML-escaped**) |
| `th:utext` | Insert **unescaped** HTML |
| `th:each="e : ${expenses}"` | Loop (`th:each="pr, stat : ${requests}"` gives `stat.count`) |
| `th:if` / `th:unless` | Conditionals |
| `th:href="'/' + ${expense.id}"`, `th:action`, `th:value`, `th:id` | Dynamic attributes (string concatenation) |
| `${session.user.email}` | Session access |
| `${#lists.isEmpty(list)}` | Utility object |
| `layout:decorate="~{layout.html}"` + `layout:fragment="contents"` | **Layout dialect:** the page fills the `contents` hole in `layout.html` (shared header/nav) |

Natural templates: `th:text` pages still open in a browser with the placeholder text (`Lunch`, `ZAR 0`), which is why the placeholders are there.

### Selenium / Page Object Model

`AbstractPage` wraps `fillText`, `click`, `submit`, `textOf`; subclasses (`ExpenseForm`, `ExpensesPage`, `LoginPage`) expose *intent* methods and return the next page object, giving a **fluent test**:

```java
session.openLoginPage().login("student1@...").shouldBeOnExpensesPage()
       .clickOnCaptureExpense().fillExpenseForm("Movies", amountOf(200), TODAY)
       .submitExpenseForm().shouldHaveExpense("Movies").expensesGrandTotalShouldBe(amountOf(600));
```

Why POM? Selectors live in one place; tests read like user journeys. **Templates must emit exactly the ids the page objects look for** (`th:id="'date_' + ${expense.id}"`, `grand_total`, `add_expense`, `submit`...).

**Use it in an answer:** "WeShare separates model, controller and view: `ExpensesController.view` gets data from the DAO, and Thymeleaf renders it. After POST `/expenses` I redirect (PRG) so a refresh doesn't duplicate the expense."

---

## 3. Project C: study-repo mini-project (Library Catalogue)

Three files, eight TODOs. Know the model answers cold.

**TODO 1: labels (accessibility)**

```html
<label for="book-title">Title</label>
<input type="text" id="book-title" placeholder="Title" required>
```

Placeholder is not a label; `for` must equal the input's `id`.

**TODO 3–5: CSS**

```css
* { box-sizing: border-box; }
.book-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
             gap: 1rem; list-style: none; padding: 0; margin: 0; }
@media (max-width: 600px) { .book-grid { grid-template-columns: 1fr; } }
```

**TODO 6–8: JS**

```js
function renderBooks() {
  bookList.innerHTML = '';                       // clear
  books.forEach(({ title, author }) => {
    const li = document.createElement('li'); li.className = 'book-card';
    const h3 = document.createElement('h3'); h3.textContent = title;
    const p  = document.createElement('p');  p.textContent  = author;
    li.append(h3, p); bookList.appendChild(li);
  });
}
renderBooks();

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  books.push({ title: document.getElementById('book-title').value,
               author: document.getElementById('book-author').value });
  renderBooks(); bookForm.reset();
});

async function loadBooksFromServer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return await response.json();
}
```

`fetch('data.json')` needs a **server** (`python3 -m http.server 8000`); opened as `file://` it's blocked. Uses `textContent` (not `innerHTML`) so user input can't inject markup.

---

## 4. Core concept refresher

### HTML

- **Semantic elements** (`header nav main section article aside footer`) convey meaning to screen readers, SEO, and other developers; `div`/`span` convey nothing.
- One `<h1>`; don't skip heading levels for styling.
- Input `type` (`email`, `number`, `date`) gives validation + right mobile keyboard; `required` gives built-in validation.
- `<button>`/`<a>` are keyboard-accessible; `<div onclick>` isn't. `alt` on every `<img>` (`alt=""` if decorative).
- `<script>` at end of `<body>` (or `defer`) so the DOM exists first. `<meta name="viewport">` needed for responsive.

### CSS

- **Box model** (inside → out): content → padding → border → margin. `border-box` makes `width` include padding + border.
- **Specificity:** element \< class \< id \< inline \< `!important`; ties → later rule wins.
- **Flexbox = 1-D** (nav bars, centring: `display:flex; justify-content; align-items; flex-wrap`). **Grid = 2-D** (page/card layouts: `grid-template-columns`, `gap`, `repeat/minmax/fr`). Your `nav` in WeShare uses flex; the card list uses grid.
- **Responsive:** media queries, relative units (`rem`, `%`, `vw`), `max-width`, mobile-first.
- `display: inline-block` vs `block` vs `inline`; `position` (static/relative/absolute/fixed/sticky); pseudo-classes like `:hover` (used on `nav a:hover`).
- Attribute selector `input[type=submit]`; compound `form.inline`, `input.inline[type=submit]` (higher specificity than plain `input`).

### JavaScript

- `const` by default, `let` if reassigned; both block-scoped and in the **TDZ** until declared. `var` is function-scoped and hoisted (initialised as `undefined`). Function declarations are fully hoisted; arrow functions assigned to `const` are not.
- `==` coerces, `===` doesn't. Falsy: `false 0 "" null undefined NaN`.
- Arrow functions, template literals, destructuring (`const {word} = entry`), spread, default params.
- Array methods: `map` (transform), `filter` (subset), `reduce` (fold to one value), `find`, `forEach`, `some`.
- **DOM:** `getElementById`, `querySelector(All)`, `createElement`, `append/appendChild`, `textContent` vs `innerHTML`, `classList.add/remove/toggle`, `setAttribute`.
- **Events:** `addEventListener(type, fn)`; `event.target`, `preventDefault()`, `stopPropagation()`; **bubbling** lets you attach one listener to a parent (event delegation).
- **Async:** Promise states pending → fulfilled/rejected; `.then/.catch` vs `async/await` (+ `try/catch`); `fetch` only rejects on network failure, so **check `response.ok`**.
- **Modules:** `<script type="module">`, `import/export`; modules are deferred and strict.
- **Same-origin / CORS:** your SPA calls another origin (dictionaryapi.dev); it works because that API allows cross-origin requests.
- **XSS:** never put untrusted input into `innerHTML`/`th:utext`.

### HTTP

Request = method + URL + headers + body; response = status + headers + body. `GET` read, `POST` create, `PUT/PATCH` update, `DELETE` remove. `2xx` OK, `3xx` redirect (PRG uses `302`), `4xx` client error (`404`), `5xx` server error. Cookies carry the session id.

---

## 5. Practice questions (answer closed-book, then check)

**Short answers (define → contrast → example from a project)**

1. Define SPA vs server-rendered app. Which is the Dictionary app, which is WeShare, and how does navigation differ?
2. Why does `<a href="#/dictionary">` not reload the page? What event does the router listen for?
3. Explain what happens between `fetch(url)` and text appearing on screen. Why must rendering be inside `.then`?
4. Compare DOM API vs `innerHTML` vs Handlebars rendering (pros/cons, security).
5. What does `event.preventDefault()` do in the lookup form? What breaks without it?
6. Explain MVC using WeShare files as examples of each layer.
7. What is Post/Redirect/Get and which WeShare handler uses it?
8. Difference between `th:text` and `th:utext`; why is one risky?
9. How does `layout:decorate`/`layout:fragment` avoid repeating the nav on every page?
10. Why is `/{id}` registered after the other routes?
11. What is the AccessManager doing, and what happens for a logged-out user hitting `/expenses`?
12. Why do the Selenium page objects use `WebDriverWait` in the SPA tests but plain `findElement` in WeShare?
13. Box model, specificity, Flexbox vs Grid: one sentence each plus a use in your code.
14. Why `label for` + `id` matters; name/id difference on inputs.
15. `var` vs `let` vs `const`; what is the TDZ and where does `app-5a.js` hit it?

**Code (timed)** 16. (10 min) Add a `#lookup` input handler to app-4 so submitting the form fetches and renders the typed word with Handlebars, with an error message for unknown words. 17. (10 min) Add a third route `/synonyms` to the app-5a router, using the fixed declaration order. 18. (15 min) Add a "Delete" button to each book card in the mini-project (use event delegation on `#book-list`). 19. (15 min) Add a `/about` page to WeShare: route, controller handler, template using the layout, nav link. 20. (10 min) Style the WeShare `nav` as a responsive flex bar that stacks under 600px.

**Debugging** 21. Find all problems in `app-5a.js` (list at least four; see §1 traps). 22. `fetch('data.json')` works over `http.server` but not by double-clicking `index.html`. Why? 23. Form submits but the server sees `null` for `amount`. What's the most likely cause? (missing `name` attribute)

---

## 6. Game plan for the 160 minutes

*(I don't know the exact format, so treat this as a default for a mixed written + build paper.)*

1. **First 10 min:** read everything, list deliverables, note marks per part, decide order (easy marks first).
2. **Build in small increments:** get one route/page/feature working, run it, then move on. Commit often if a repo is required.
3. **Keep the browser console and dev tools open**: most JS bugs announce themselves there.
4. **Written answers:** define → contrast → project example. Two sentences of example beat a paragraph of theory.
5. **Last 15 min:** re-run tests, check ids/names match, proofread the last sentence of each written answer (typos under time pressure are your recurring habit per your study-repo notes), make sure everything is committed/saved.

**Night-before checklist**

- [ ] Explain the Dictionary SPA app-1 → app-5b from memory, with the TDZ bug
- [ ] Draw WeShare's request lifecycle and MVC layers
- [ ] Write the mini-project TODO 1–8 without notes
- [ ] Recite box model, specificity order, flex vs grid, Promise/await, PRG
- [ ] Do questions 16–19 under a timer