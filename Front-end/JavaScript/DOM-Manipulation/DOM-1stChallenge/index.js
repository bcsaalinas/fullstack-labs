const third =
  document.firstElementChild.lastElementChild.querySelector(
    "ul"
  ).lastElementChild;

third.innerHTML = "hello";

document.getElementsByTagName("li")[2].style.color = "purple";

const title = document.querySelector("h1");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  title.classList.toggle("huge");
});
//togle certain css class with a button event listener
