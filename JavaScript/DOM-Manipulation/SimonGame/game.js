const startButton = $(".start-btn");
const green = $(".green");
const red = $(".red");
const yellow = $(".yellow");
const blue = $(".blue");
let colors = ["red", "green", "yellow", "blue"];
let started = false;
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let title = $("#level-title");
let flashDuration = 550;
const MIN_FLASH = 120;
const FLASH_STEP = 90;
let acceptingInput = false;

// dynamic gap constants (slower shrink so pattern stays readable longer)
const BASE_GAP = 750; // starting delay between flashes
const MIN_GAP = 300; // fastest allowed gap (was 180)
const GAP_STEP = 40; // reduction per level (was 60)

function advanceLevel() {
  level++;
  flashDuration = Math.max(MIN_FLASH, 550 - (level - 1) * FLASH_STEP);
  title.text("level " + level);
  console.log("[advanceLevel] level:", level, "flashDuration:", flashDuration);
}

$(document).on("keydown", startGame);

startButton.on("click", () => {
  started ? console.log("ur dumb") : startGame();
});

$(".btn").on("click", function () {
  if (!started || !acceptingInput) return;
  userChosenColor = $(this).attr("id");
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColor);
  animatePress(userChosenColor, flashDuration);
});

function nextSequence() {
  const randomColor = colors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  advanceLevel();
  playPattern();
}

function playPattern() {
  acceptingInput = false;
  const gap = Math.max(MIN_GAP, BASE_GAP - (level - 1) * GAP_STEP);
  console.log("[playPattern] level", level, "gap", gap);
  gamePattern.forEach((color, i) => {
    setTimeout(() => {
      playSound(color);
      animatePress(color, flashDuration);
      if (i === gamePattern.length - 1) {
        acceptingInput = true;
      }
    }, i * gap);
  });
}

function animatePress(color, duration) {
  const $btn = $("." + color);
  $btn.addClass("pressed");
  console.log("[animatePress]", color, "duration:", duration);
  setTimeout(() => $btn.removeClass("pressed"), duration);
}

function startGame() {
  if (started) return;
  started = true;
  level = 0;
  setTimeout(nextSequence, 800);
}

function playSound(key) {
  switch (key) {
    case "green":
      let greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "blue":
      let blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "yellow":
      let yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "red":
      let redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "wrong":
      let wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      break;
  }
}

function checkAnswer(i) {
  if (userClickedPattern[i] !== gamePattern[i]) {
    looseGame();
  } else if (userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
  }
}

function looseGame() {
  level = 0;
  title.text("YOU LOST");
  playSound("wrong");
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  d;
}
