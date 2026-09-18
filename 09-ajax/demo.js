/**
 * demo.js — AJAX
 * Both buttons fetch a random post, one page load, no reload — that's AJAX,
 * regardless of which underlying mechanism does the request.
 */

function randomId() {
  return Math.ceil(Math.random() * 100);
}

// --- Modern: fetch() --------------------------------------------------------
document.getElementById("fetch-btn").addEventListener("click", async () => {
  const resultEl = document.getElementById("fetch-result");
  resultEl.textContent = "Loading...";
  resultEl.classList.add("loading");

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const post = await response.json();
    resultEl.textContent = post.title;
  } catch (error) {
    resultEl.textContent = `Failed: ${error.message}`;
  } finally {
    resultEl.classList.remove("loading");
  }
});

// --- Older: XMLHttpRequest ---------------------------------------------------
document.getElementById("xhr-btn").addEventListener("click", () => {
  const resultEl = document.getElementById("xhr-result");
  resultEl.textContent = "Loading...";
  resultEl.classList.add("loading");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/posts/${randomId()}`);

  xhr.onload = () => {
    resultEl.classList.remove("loading");
    if (xhr.status === 200) {
      const post = JSON.parse(xhr.responseText);
      resultEl.textContent = post.title;
    } else {
      resultEl.textContent = `Failed: HTTP ${xhr.status}`;
    }
  };

  xhr.onerror = () => {
    resultEl.classList.remove("loading");
    resultEl.textContent = "Request failed (network error).";
  };

  xhr.send();
});
