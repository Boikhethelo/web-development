/**
 * demo.js — Working with APIs
 */

const statusEl = document.getElementById("status");
const listEl = document.getElementById("post-list");

async function loadPosts() {
  statusEl.textContent = "Loading...";
  statusEl.classList.remove("error");
  listEl.innerHTML = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

    // fetch() only rejects on a true network failure — a 404/500 still
    // "succeeds" as a response, so this check is what actually catches those.
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const posts = await response.json(); // .json() itself returns a promise too
    statusEl.textContent = `Loaded ${posts.length} posts.`;

    posts.forEach((post) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${post.title}</strong>${post.body}`;
      listEl.appendChild(li);
    });
  } catch (error) {
    statusEl.textContent = `Failed to load posts: ${error.message}`;
    statusEl.classList.add("error");
  }
}

document.getElementById("load-btn").addEventListener("click", loadPosts);
