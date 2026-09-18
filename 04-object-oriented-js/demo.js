/**
 * demo.js — Object-Oriented JS
 */

class Car {
  #topSpeed; // private field — not accessible as car.#topSpeed from outside this class

  constructor(make, topSpeed) {
    this.make = make;
    this.speed = 0;
    this.#topSpeed = topSpeed;
  }

  /** Increases speed but never past this car's top speed. */
  accelerate(amount) {
    this.speed = Math.min(this.speed + amount, this.#topSpeed);
  }

  brake(amount) {
    this.speed = Math.max(this.speed - amount, 0);
  }

  /** Percentage of top speed currently reached — used to size the bar in the UI. */
  speedPercent() {
    return Math.round((this.speed / this.#topSpeed) * 100);
  }
}

const cars = [new Car("Toyota", 180), new Car("Tesla", 250)];

const garage = document.getElementById("garage");

/** Renders one Car object as a card. Re-run after every state change. */
function renderCar(car, index) {
  const card = document.createElement("div");
  card.className = "car-card";
  card.innerHTML = `
    <h3>${car.make}</h3>
    <p>Speed: ${car.speed} km/h</p>
    <div class="speed-bar"><div class="speed-fill" style="width:${car.speedPercent()}%"></div></div>
    <button data-index="${index}" data-action="accelerate">Accelerate</button>
    <button data-index="${index}" data-action="brake">Brake</button>
  `;
  return card;
}

function renderGarage() {
  garage.innerHTML = ""; // clear and rebuild — simple approach, revisited in folder 08
  cars.forEach((car, index) => garage.appendChild(renderCar(car, index)));
}

// Event delegation (folder 03) on the garage container, since car cards are
// generated dynamically and don't exist until renderGarage() runs.
garage.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  const index = Number(event.target.dataset.index);
  const action = event.target.dataset.action;
  if (action === "accelerate") cars[index].accelerate(20);
  if (action === "brake") cars[index].brake(20);
  renderGarage();
});

renderGarage();
