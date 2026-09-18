/**
 * demo.js — JSON
 */

const output = document.getElementById("output");

document.getElementById("stringify-btn").addEventListener("click", () => {
  const sample = {
    name: "Mogs",
    stack: ["Java", "Flutter", "Docker"],
    active: true,
  };
  // Third argument (2) pretty-prints with 2-space indentation for readability
  output.textContent = JSON.stringify(sample, null, 2);
});

document.getElementById("parse-btn").addEventListener("click", () => {
  const raw = document.getElementById("json-input").value;
  try {
    const parsed = JSON.parse(raw);
    // Confirm it round-trips back into a real JS object we can use normally
    output.textContent =
      `Parsed OK. parsed.name = "${parsed.name}"\n\n` +
      JSON.stringify(parsed, null, 2);
  } catch (error) {
    // Malformed JSON throws a SyntaxError — this is exactly folder 01's lesson,
    // applied to real input instead of a contrived example.
    output.innerHTML = `<span class="error">Invalid JSON: ${error.message}</span>`;
  }
});
