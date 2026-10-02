/**
 * Exercise 2 — Promise.all with real fetches
 *
 * TODO: using fetch (folder 07), write a function `loadThreePosts()` that:
 * 1. Builds an array of THREE fetch() promises for post ids 1, 2, 3 from
 *    https://jsonplaceholder.typicode.com/posts/{id}
 *    (fetch() itself, not yet parsed with .json())
 * 2. Uses Promise.all to wait for all three responses
 * 3. Then, for each response, calls .json() (also returns a promise — you
 *    can Promise.all THOSE too, or use .then() again) to get the actual
 *    post objects
 * 4. console.log the three post titles
 * 5. Wrap it in a .catch() so a failure in any one request is handled
 *
 * This is meaningfully faster than fetching one at a time, since all three
 * requests go out together instead of waiting for each to finish first.
 */

function loadThreePosts() {
  // your code here
    const threePost = [1,2,3];

    // 1. Three fetch promises, all started immediately
    const fetchPromises = ids.map((id) =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    );

    // 2. Wait for all three responses
    // 3. Parse each response's body (also returns promises)
    // 4. Log the titles


    Promise.all(fetchPromises)
        .then((responses) => Promise
        .all(responses.map((res) => res
        .json())))
        .then((posts) => {posts
        .forEach((post) => console.log(post.title));})
        .catch((error) => console.log("Error:", error.message));



}

loadThreePosts();
