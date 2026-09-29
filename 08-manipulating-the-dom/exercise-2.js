/**
 * Exercise 2 — event delegation + classList
 *
 * #ex2-list already has 3 <li> items, each with a delete button, in
 * exercises.html.
 *
 * TODO:
 * 1. Add ONE click listener on #ex2-list (event delegation, folder 03).
 * 2. If the click was on a button with class "delete-btn", remove that
 *    button's parent <li> from the list.
 * 3. If the click was on the <li> itself (not the button), toggle a class
 *    "completed" on it — add a CSS rule for .completed in style.css
 *    (e.g. strike-through text) to see it working.
 *
 * Hint: event.target.closest("li") finds the nearest <li> ancestor of
 * whatever was actually clicked, which is useful since the click might
 * land on the button OR the surrounding text.
 */

const list = document.getElementById("ex2-list");

list.addEventListener("click" , (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
        const li = deleteBtn.closest("li");
        if (li) {
            li.remove();
        }
        return;

    }
    const li = event.target.closest("li");
    if (li && list.contains(li)) {
        li.classList.toggle("completed");
    }
});

