//height in m and weight in kg
function bmiCalculator(weight, height) {
  let res = Math.round(weight / Math.pow(height, 2));
  if (res < 18.5) {
    console.log("Your bmi is " + res + ", so you are underweight.");
  } else if (res > 18.5 && res < 24.9) {
    console.log(`"Your BMI is ${res}, so you have a normal weight."`);
  } else {
    console.log(`"Your BMI is ${res}, so you are overweight."`);
  }

  return res;
}

let bimi = bmiCalculator(60, 2);
