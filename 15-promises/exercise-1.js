/**
 * Exercise 1 — build a promise by hand
 *
 * TODO: write a function `checkPasswordStrength(password)` that returns a
 * NEW Promise:
 * - resolve with the string "strong" if password.length >= 8
 * - otherwise reject with new Error("Password too short")
 *
 * Then call it with .then()/.catch() for both a short and a long password
 * and console.log the outcome of each.
 */

function checkPasswordStrength(password) {
  // your code here — return new Promise((resolve, reject) => { ... })
    return new Promise((resolve, reject) => {
        if(password.length >= 8){
            resolve("strong");
        }else{
            reject(new Error("Password must be 8 characters"));
        }
    })
}

checkPasswordStrength("hunter2")
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error.message));

checkPasswordStrength("verysecurepassword")
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error.message));
