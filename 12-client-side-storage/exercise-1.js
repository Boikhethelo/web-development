/**
 * Exercise 1 — a notes list that survives a page reload
 *
 * Elements already in exercises.html: #note-form, #note-input, #note-list
 *
 * TODO:
 * 1. On page load, read an array of notes (strings) from
 *    localStorage.getItem("notes") (JSON.parse it — default to [] if
 *    nothing's stored yet), and render each one as an <li> in #note-list.
 * 2. On #note-form submit (remember event.preventDefault(), folder 03):
 *    - read the typed value from #note-input
 *    - add it to the in-memory notes array
 *    - save the WHOLE array back with localStorage.setItem (JSON.stringify)
 *    - re-render #note-list so the new note shows immediately
 *    - clear the input
 * 3. Give each <li> a small "x" delete button that removes that note from
 *    the array, re-saves to localStorage, and re-renders the list.
 * 4. Test it: add a few notes, then reload the page — they should still
 *    be there, because they're in localStorage, not just a JS variable.
 */

const STORAGE_KEY = "notes";

function loadNotes() {
  // your code here — return an array
    const raw = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(raw) ? JSON.parse(raw) : [];

}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));

}

function renderNotes(notes) {
  // your code here — rebuild #note-list from the notes array
    const noteList = document.getElementById("note-list");
    noteList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes(notes);
            renderNotes(notes);
        });

        li.appendChild(deleteBtn);
        noteList.appendChild(li);
    });

}

// wire up form submit + initial render here
let notes = loadNotes();
renderNotes(notes);

document.getElementById("note-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.getElementById("note-input");
    notes.push(input.value);
    saveNotes(notes);
    renderNotes(notes);
    input.value = "";
});
