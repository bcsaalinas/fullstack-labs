const images = document.querySelectorAll("img");
console.log(images);
const title = document.querySelector(".title");
const button = document.querySelector(".roll");

const firstImage = images[0];
const secondImage = images[1];

function rollDice() {
  const randomNum1 = Math.floor(Math.random() * 6) + 1;
  console.log(randomNum1);

  const randomNum2 = Math.floor(Math.random() * 6) + 1;
  console.log(randomNum2);

  firstImage.setAttribute("src", `images/dice${randomNum1}.png`);
  secondImage.setAttribute("src", `images/dice${randomNum2}.png`);

  if (randomNum1 > randomNum2) {
    title.textContent = "Player 1 wins";
  } else if (randomNum1 === randomNum2) {
    title.textContent = "Draw";
  } else {
    title.textContent = "Player 2 wins";
  }
}

button.addEventListener("click", () => {
  rollDice();
});
