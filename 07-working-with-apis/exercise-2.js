/**
 * Exercise 2 — render fetched data into the page
 *
 * The element #results exists in exercises.html.
 *
 * TODO:
 * 1. Write an async function `loadTodos()` that fetches
 *    "https://jsonplaceholder.typicode.com/todos?_limit=5"
 * 2. For each todo returned, create a <p> element showing the todo's
 *    `title`, and give it a CSS class of "done" if todo.completed is true
 *    (add a .done rule to style.css, e.g. text-decoration: line-through)
 * 3. Append each <p> to #results
 * 4. Update #status to show "Loaded" once finished, or the error message
 *    if the request fails
 */

async function loadTodos() {
    const results = [];
    let status = 'Loading...';
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const todos = await response.json();
        const container = document.getElementById("todo-container") || document.body;

        todos.forEach((todo) => {
            const p = document.createElement("p");
            p.textContent = todo.title;
            if(todo.completed){
                p.classList.add("done");
            }

            container.appendChild(p);
            results.push(todo);



        })
        status = 'Loaded';
        return { status, results }
    } catch (error) {
        console.error(error);
    }
}

loadTodos();
