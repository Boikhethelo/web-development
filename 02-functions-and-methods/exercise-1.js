/**
 * Exercise 1 — Write a function from scratch
 *
 * Write a function `calculateBMI(weightKg, heightM)` that returns the BMI,
 * rounded to 1 decimal place, using the formula: weight / (height * height)
 *
 * TODO: implement the function below, then uncomment the console.log lines
 * to test it. Expected: calculateBMI(70, 1.75) -> 22.9
 */

function calculateBMI(weightKg, heightM) {
  return (weightKg / (heightM * heightM)).toFixed(1);
}

 console.log(calculateBMI(70, 1.75)); // expect 22.9
 console.log(calculateBMI(90, 1.8));  // expect 27.8
