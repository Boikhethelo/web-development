/**
 * demo.js — Inheritance
 */

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // must run before using `this` below
    this.breed = breed;
  }
  speak() {
    return `${this.name} barks.`; // overrides Animal.speak
  }
}

class Cat extends Animal {
  constructor(name, indoor) {
    super(name);
    this.indoor = indoor;
  }
  speak() {
    return `${this.name} meows.`;
  }
}

const animals = [
  new Dog("Rex", "Labrador"),
  new Cat("Milo", true),
  new Animal("Generic Creature"), // Animal itself is still usable directly
];

const zoo = document.getElementById("zoo");

animals.forEach((animal) => {
  const card = document.createElement("div");
  card.className = "animal-card";
  // data-species drives the CSS attribute selectors above
  card.dataset.species = animal.constructor.name.toLowerCase();
  card.innerHTML = `
    <h3>${animal.constructor.name}</h3>
    <p>${animal.speak()}</p>
    <p>${animal instanceof Animal ? "is an Animal (inherited)" : ""}</p>
  `;
  zoo.appendChild(card);
});
