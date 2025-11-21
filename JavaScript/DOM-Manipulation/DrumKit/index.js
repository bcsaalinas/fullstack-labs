let numberButtons = document.querySelectorAll(".drum").length;
let array = document.querySelectorAll(".drum");

for (let i = 0; i < numberButtons; i++) {
  array[i].addEventListener("click", function () {
    const button = this.innerHTML;
    makeSound(button);
    buttonAnimation(button);
  });
}

document.addEventListener("keydown", function (event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

const keySoundMap = {
  w: "sounds/crash.mp3",
  a: "sounds/kick-bass.mp3",
  s: "sounds/snare.mp3",
  d: "sounds/tom-1.mp3",
  j: "sounds/tom-2.mp3",
  k: "sounds/tom-3.mp3",
  l: "sounds/tom-4.mp3",
};

function makeSound(key) {
  const audioPath = keySoundMap[key];

  if (!audioPath) {
    console.log(key);
    return;
  }

  const drumSound = new Audio(audioPath);
  drumSound.play();
}

function buttonAnimation(currentKey) {
  let keyPressed = document.querySelector("." + currentKey);
  keyPressed.classList.add("pressed");
  console.log(keyPressed.classList);

  setTimeout(function () {
    keyPressed.classList.remove("pressed");
  }, 100);
}
