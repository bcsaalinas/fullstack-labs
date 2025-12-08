let display = document.querySelector(".display");
const keys = document.querySelectorAll(".key");
let started = false;
let inputArray = [];
let result = 0;
let cleared = true;
let num1 = null;
let num2 = null;
let lastOperator = "";

for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", function () {
    let type = this.classList[1];
    let value = this.innerHTML;
    const fn = handlers[type];
    if (!fn) return;
    fn(value);
  });
}
let handlers = {
  number: handleNumber,
  "key-operator": handleOperator,
  "key-function": handleFunction,
};

function handleNumber(value) {
  if (!started) {
    inputArray.push(value);
    display.textContent = value;
  } else {
    inputArray.push(value);
    display.textContent += value;
  }
  started = true;
  cleared = false;
  num1 = Number(inputArray.join(""));
}

function handleOperator(value) {
  lastOperator = value;
}

function handleFunction(value) {
  return;
}
