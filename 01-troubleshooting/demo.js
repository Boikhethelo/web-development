/**
 * demo.js — Troubleshooting
 *
 * A SyntaxError can't be demoed by clicking a button — if one exists,
 * the WHOLE file fails to run, nothing below would even execute. Try it
 * yourself: temporarily delete a closing `}` anywhere in this file, save,
 * reload the page, and look at the console. Then put it back.
 */

const output = document.getElementById("output");

/** Small helper: show a message both in the console and on the page. */
function report(label, value) {
  console.log(label, value);
  output.textContent = `${label} ${value}`;
}

document.getElementById("btn-syntax-note").addEventListener("click", () => {
  report("SyntaxError note:", "read the comment above this line in demo.js");
});

document.getElementById("btn-reference").addEventListener("click", () => {
  try {
    // thisVariableWasNeverDeclared does not exist anywhere in this file —
    // that's exactly what causes a ReferenceError.
    console.log(thisVariableWasNeverDeclared);
  } catch (error) {
    // error.name tells you the error TYPE, error.message tells you WHY
    report(`${error.name}:`, error.message);
  }
});

document.getElementById("btn-type").addEventListener("click", () => {
  try {
    const notAnArray = 42;
    notAnArray.map((x) => x); // numbers don't have a .map() method — TypeError
  } catch (error) {
    report(`${error.name}:`, error.message);
  }
});

document.getElementById("btn-caught").addEventListener("click", () => {
  try {
    JSON.parse("{ this is not valid JSON }"); // will throw
    report("Result:", "this line never runs");
  } catch (error) {
    // This is the pattern you'll reuse constantly from folder 07 onward:
    // wrap risky code in try, handle the failure in catch, keep the app alive.
    report("Caught it, app kept running:", error.message);
  }
});
