# 05 — Inheritance

## What this is, coming from Java
Same goal as Java inheritance — share behaviour between related classes — but
the mechanism is a **prototype chain**, not a compiled class hierarchy. When
you write `class Dog extends Animal`, every `Dog` instance has an internal
link to `Animal.prototype`. When you call `dog.speak()` and `Dog` doesn't
define `speak`, JS walks up that chain looking for it on `Animal.prototype`.
`class`/`extends`/`super` are syntax sugar over exactly that lookup — the
syntax reads almost like Java, but understand that underneath it's a chain of
object lookups, not compiled subtyping. That's why `instanceof` and method
lookup at runtime behave a bit more loosely than Java's type system.

## Syntax
```js
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
    super(name);       // MUST call super() before using `this` — sets up the parent's fields
    this.breed = breed;
  }
  speak() {             // overrides Animal's speak — same idea as Java's @Override
    return `${this.name} barks.`;
  }
  parentSpeak() {
    return super.speak(); // explicitly call the parent's version
  }
}
```

## Composition, briefly
JS doesn't have interfaces the way Java does, and multiple inheritance isn't
supported via `extends`. When you need to share behaviour across unrelated
classes, the common pattern is **composition** — build small objects with
specific behaviour and combine them — rather than a deep inheritance tree.
Worth knowing this exists, even without going deep on it here: if you ever
feel like you need a class to `extends` two different things, that's usually
the signal to reach for composition instead.

## How this connects forward
- `08 manipulating the DOM` — every DOM element you touch (`div`, `button`,
  `input`) is itself part of a real inheritance chain (`HTMLButtonElement`
  extends `HTMLElement` extends `Element`...) — this is inheritance you've
  been using without naming it, every time you called `.addEventListener`.
