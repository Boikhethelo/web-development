/**
 * Exercise 1 — build a small profile card purely from JS
 *
 * The element #ex1-target exists (empty) in exercises.html.
 *
 * TODO: using document.createElement + appendChild (NOT innerHTML), build
 * inside #ex1-target:
 * - an <h2> with text "Mogs"
 * - a <p> with text "Software Engineering Student"
 * - a <ul> containing three <li> elements: "Java", "Flutter", "Docker"
 *
 * Do this entirely with DOM methods, no innerHTML string-building.
 */

const target = document.getElementById("ex1-target");

const name = document.createElement("h2");
name.textContent = "mogs";

const path = document.createElement("p");
path.textContent = "Software Engineering Student";

const stackList = document.createElement("ul");
const technologies = ["Java", "Flutter", "Docker"];

technologies.forEach((tech) => {
    const li = document.createElement("li");
    li.textContent = tech;
    stackList.appendChild(li);
});

// Append everything together
target.append(name, path, stackList);




