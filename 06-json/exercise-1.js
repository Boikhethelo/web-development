/**
 * Exercise 1 — round trip and fix broken JSON
 *
 * TODO 1: Convert the `student` object to a JSON string and log it.
 * TODO 2: The `brokenJson` string below has THREE JSON syntax errors in it
 *   (unquoted key, trailing comma, single quotes instead of double). Fix the
 *   string itself (edit the text), then JSON.parse it successfully and log
 *   the result.
 */

const student = { name: "Mogs", year: 2, courses: ["Java", "Flutter"] };

// your code here for TODO 1

const brokenJson = "{name: 'Mogs', year: 2,}";

// your code here for TODO 2 (edit brokenJson above, then JSON.parse it in a try/catch)
