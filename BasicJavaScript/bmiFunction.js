//height in m and weight in kg
function bmiCalculator(weight, height) {
  let res = Math.round(weight / Math.pow(height, 2));
  return res;
}

let bimi = bmiCalculator(65, 1.8);
