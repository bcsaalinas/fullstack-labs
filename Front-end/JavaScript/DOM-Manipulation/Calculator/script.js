let display = document.querySelector(".display");
const keys = document.querySelectorAll(".key");
let started = false;
let inputArray = [];
let cleared = true;
let num1 = null;
let num2 = null;
let lastOperator = "";
let result = null;

let handlers = {
  number: handleNumber,
  "key-operator": handleOperator,
  "key-function": handleFunction,
};

for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", function () {
    let type = this.classList[1];
    let value = this.innerHTML;
    const fn = handlers[type];
    if (!fn) return;
    fn(value);
  });
}

function handleNumber(value) {
  if (!started || (inputArray.length === 0 && lastOperator === "")) {
    inputArray.push(value);
    display.textContent = value;
    num1 = Number(inputArray.join(""));
  } else if (lastOperator === "") {
    inputArray.push(value);
    display.textContent += value;
    num1 = Number(inputArray.join(""));
  }

  if (lastOperator != "" && inputArray.length === 0) {
    inputArray.push(value);
    display.textContent = value;
    num2 = Number(inputArray.join(""));
  } else if (lastOperator != "" && inputArray.length != 0) {
    inputArray.push(value);
    display.textContent += value;
    num2 = Number(inputArray.join(""));
  }

  started = true;
  cleared = false;
  console.log(inputArray);
  console.log(num1, num2);
}

function handleOperator(value) {
  inputArray = [];
  if (!started) return;
  if (num1 != null && num2 != null && lastOperator != "") {
    num1 = doOperation(num1, num2, lastOperator);
    display.textContent = ` ${num1} ${value} `;
    lastOperator = value;
  } else {
    display.textContent = ` ${value}`;
    lastOperator = value;
    console.log(lastOperator);
    console.log(num1);
  }
}

function handleFunction(value) {
  switch (value) {
    case "AC":
      started = false;
      cleared = true;
      result = 0;
      inputArray = [];
      num1 = null;
      num2 = null;
      lastOperator = "";
      display.textContent = "0";
      result = null;
      break;
    case "C":
      if (inputArray.length === 1) {
        display.textContent = "0";
        started = false;
      } else {
        inputArray.pop();
        display.textContent = inputArray.join("");
      }
    case "=":
      result = doOperation(num1, num2, lastOperator);
      display.textContent = result;
  }
}

function doOperation(num1, num2, operation) {
  if (num1 != null || num2 != null) {
    const a = Number(num1);
    const b = Number(num2);
    switch (operation) {
      case "÷":
        return a / b;
      case "x":
        return a * b;
      case "+":
        return a + b;
      case "-":
        return a - b;
      default:
        return;
    }
  } else {
    return;
  }
}
