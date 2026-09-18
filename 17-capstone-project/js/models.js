/**
 * models.js — Object-Oriented JS (04), Inheritance (05), Manipulating the
 * DOM (08)
 *
 * A small `Widget` base class handles the shared status-message behaviour;
 * WeatherWidget and QuoteWidget extend it and each define their own
 * render() — the same "parent defines the shared bit, child fills in the
 * specific bit" shape as folder 05's Shape/Rectangle/Circle exercise.
 */

class Widget {
  /** @param {HTMLElement} statusEl element used to show loading/error text */
  constructor(statusEl) {
    this.statusEl = statusEl;
  }

  setStatus(message, isError = false) {
    this.statusEl.textContent = message;
    this.statusEl.classList.toggle("error", isError);
  }

  clearStatus() {
    this.setStatus("");
  }
}

class WeatherWidget extends Widget {
  constructor(statusEl, outputEl) {
    super(statusEl); // sets up this.statusEl via the parent constructor
    this.outputEl = outputEl;
  }

  /** Renders a weather result object (from api.js's fetchWeather) into the DOM. */
  render(weather) {
    this.outputEl.innerHTML = `
      <div class="weather-temp">${weather.temperature}°C</div>
      <div class="weather-place">${weather.place} — wind ${weather.windspeed} km/h</div>
    `;
  }
}

class QuoteWidget extends Widget {
  constructor(statusEl, textEl, authorEl) {
    super(statusEl);
    this.textEl = textEl;
    this.authorEl = authorEl;
  }

  render(quote) {
    this.textEl.textContent = `"${quote.text}"`;
    this.authorEl.textContent = `— ${quote.author}`;
  }
}

/**
 * NoteManager owns the notes array, persistence (via storage.js), and
 * rendering — a plain class (not extending anything) since it doesn't share
 * the "fetch + status message" shape the two widgets above do.
 */
class NoteManager {
  constructor(listEl) {
    this.listEl = listEl;
    this.notes = loadNotes(); // from storage.js — [{ text, done }, ...]
  }

  add(text) {
    this.notes.push({ text, done: false });
    saveNotes(this.notes);
    this.render();
  }

  toggle(index) {
    this.notes[index].done = !this.notes[index].done;
    saveNotes(this.notes);
    this.render();
  }

  remove(index) {
    this.notes.splice(index, 1);
    saveNotes(this.notes);
    this.render();
  }

  render() {
    this.listEl.innerHTML = "";
    this.notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.className = note.done ? "done" : "";

      const span = document.createElement("span");
      span.textContent = note.text;
      span.addEventListener("click", () => this.toggle(index));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "secondary";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => this.remove(index));

      li.appendChild(span);
      li.appendChild(deleteBtn);
      this.listEl.appendChild(li);
    });
  }
}
