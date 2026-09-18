/**
 * Exercise 2 — overriding + calling the parent with super
 *
 * `Employee` is given. TODO:
 * 1. Create `Manager extends Employee`, constructor takes (name, salary, teamSize)
 * 2. Override `describe()` in Manager so it calls the PARENT's describe()
 *    via super.describe(), then appends `, manages a team of ${teamSize}`
 *    (don't just rewrite the whole string manually — actually call super.describe())
 */

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  describe() {
    return `${this.name} earns ${this.salary}`;
  }
}

// class Manager extends Employee { ... }

// const m = new Manager("Alex", 60000, 4);
// console.log(m.describe()); // "Alex earns 60000, manages a team of 4"
