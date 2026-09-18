/**
 * demo.js — Manipulating the DOM
 */

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

/** Builds and attaches one <li> for a task string. */
function addTaskToDOM(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text; // textContent, never innerHTML, for user-typed input

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  // Toggle "completed" styling by clicking the text itself
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  deleteBtn.addEventListener("click", () => {
    li.remove(); // removes this <li> directly from the DOM
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // folder 03 — stop the default page reload
  const text = input.value.trim();
  if (!text) return;
  addTaskToDOM(text);
  input.value = "";
  input.focus();
});
