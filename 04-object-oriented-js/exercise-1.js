/**
 * Exercise 1 — Write a class from scratch
 *
 * Write a `BankAccount` class with:
 * - a constructor that takes `owner` and starting `balance` (default 0)
 * - a private field #balance (use the balance passed into the constructor)
 * - method deposit(amount) — adds to the balance
 * - method withdraw(amount) — subtracts from balance, but if amount is
 *   greater than the balance, log an error and don't change the balance
 * - method getBalance() — returns the current balance
 *
 * TODO: implement the class, then test with the calls below.
 */

class BankAccount {
    #balance;
  constructor(owner, balance){
      this.owner = owner;
      this.#balance = balance;
  }

  deposit(amount){
      this.#balance += amount;
  }

  withdraw(amount){
      if(amount > this.#balance){
          console.error("You don't have any balance!");
      }else{
          this.#balance -= amount;
      }
  }

  getBalance(){
      return this.#balance;
  }
}



 const acc = new BankAccount("Mogs", 100);
 acc.deposit(50);
 console.log(acc.getBalance()); // 150
 acc.withdraw(500);              // should log an error, balance unaffected
 console.log(acc.getBalance()); // still 150
