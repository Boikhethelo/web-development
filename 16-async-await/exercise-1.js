/**
 * Exercise 1 — rewrite a .then() chain as async/await
 *
 * Below is a working promise chain. TODO: rewrite `loadPostAndAuthor` as an
 * `async` function using `await` and `try/catch` instead of `.then()`/
 * `.catch()`. The BEHAVIOUR must stay identical — just the syntax changes.
 * (This is the direct comparison the README's example is built from —
 * write your own version instead of copying it.)
 */

function loadPostAndAuthorChained(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((post) => {
      console.log("Post title:", post.title);
      return fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    })
    .then((res) => res.json())
    .then((user) => console.log("Author:", user.name))
    .catch((error) => console.error("Failed:", error.message));
}

async function loadPostAndAuthor(postId) {
  // your rewritten version here
}

// loadPostAndAuthorChained(1); // the original, for comparison
// loadPostAndAuthor(1);         // your rewrite — should log the same two lines
