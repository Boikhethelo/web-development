/**
 * Exercise 2 — event delegation
 *
 * There's a <ul id="color-list"> with three <li> items in exercises.html.
 *
 * TODO:
 * 1. Add ONE "click" listener to #color-list itself (not to each <li>).
 * 2. Inside it, check `event.target` — if the click landed on an <li>
 *    (hint: event.target.tagName === "LI"), log its textContent to the
 *    console and toggle a CSS class "selected" on it using
 *    event.target.classList.toggle("selected").
 * 3. Add a rule for .selected in style.css (e.g. bold text or a background
 *    colour) so you can see it working.
 *
 * Why delegate instead of adding 3 listeners? Because if items are added to
 * this list later (folder 08), a listener attached directly to them wouldn't
 * exist yet — the parent listener still catches clicks on new children.
 */

const colorList = document.getElementById("color-list");

// your code here
