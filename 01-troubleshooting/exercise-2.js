/**
 * Exercise 2 — Defensive coding with try/catch
 *
 * Below is a function that looks up a user by id in the `users` array and
 * returns their email. As written, it will crash with a TypeError if you
 * pass an id that doesn't exist (because `find` returns `undefined`, and
 * undefined has no `.email` property).
 *
 * TODO:
 * 1. Wrap the risky line in a try/catch.
 * 2. In the catch block, console.error a helpful message instead of letting
 *    the page crash — something like "No user found with id 99".
 * 3. Test it by calling getUserEmail(1)  -> should work
 *    and getUserEmail(99) -> should be caught, not crash.
 */

const users = [
  { id: 1, email: "mogs@example.com" },
  { id: 2, email: "sam@example.com" },
];

function getUserEmail(id) {
  try{
    const user = users.find((u) => u.id === id);
    return user.email;
  }catch{
    console.log("Error getting user", id);
  }

  // return user.email; // <- this line throws if `user` is undefined
}

// Try both of these once you've added the try/catch:
console.log(getUserEmail(1));
console.log(getUserEmail(99));
