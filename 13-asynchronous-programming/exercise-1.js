/**
 * Exercise 1 — predict, then verify
 *
 * Before running this file, on paper (or in your head) write down the order
 * you THINK these five console.log lines will appear in. Then open the
 * console and check. If you were wrong, re-read the README's event loop
 * section and figure out why.
 */

console.log("A - first line of the file");

setTimeout(() => console.log("B - setTimeout, 100ms"), 100);

setTimeout(() => console.log("C - setTimeout, 0ms"), 0);

Promise.resolve().then(() => console.log("D - Promise.then"));

console.log("E - last line of the file");

/**
 * TODO: once you've verified the order, write ONE sentence as a comment
 * below explaining, in your own words, why E logs before C, and why C
 * logs before B, despite C and E being written in that physical order in
 * the file.
 */

// your explanation here:
