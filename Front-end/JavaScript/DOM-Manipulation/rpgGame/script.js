let health = 100;
let gold = 50;
let xp = 0;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You enter the town square, you see a sign that says 'Store' and a dark cave entrance.",
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight slang beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave, you see some monsters!",
  },

  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster!",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: "You crushed the monster! You gained XP and gold",
  },
  {
    name: "lose",
    "button text": ["TRY AGAIN?", "TRY AGAIN?", "TRY AGAIN?"],
    "button functions": [restart, restart, restart],
    text: "You die :(",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "YOU WONN!!!! ",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to Town Square?"],
    "button functions": [picTwo, picEight, goTown],
    text: "You have found a mystery puzzle. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose mathces one of the random numbers, you win!",
  },
];

const weapons = [
  { name: "Stick", power: 5 },
  { name: "Dagger", power: 30 },
  { name: "Claw Hammer", power: 50 },
  { name: "Sword", power: 100 },
];

const monsters = [
  { name: "Slime", level: 2, health: 15 },
  { name: "Slang Beast", level: 8, health: 60 },
  { name: "Dragon", level: 20, health: 300 },
];

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function goTown() {
  update(locations[0]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You bought 10 health.";
  } else {
    text.innerText = "You don't have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a new weapon!" + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += "Your inventory has: " + inventory + " .";
    } else {
      text.innerText = "You dont have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon";
    text.innerText += "Sell your older weapons for 15 gold";
    button1.innerText = "Sell Weapon";
    button1.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += "Your inventory now has: " + inventory + ".";
  } else {
    text.innerText = "You cant sell your only weapon!";
  }
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;

  goFight();
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " is attacking!";
  text.innerText +=
    "You attacked with your " + weapons[currentWeapon].name + ".";
  if (isMonsterHit) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += "You missed!";
  }
  healthText.innerText = health;
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() < 0.1 && inventory.length !== 1) {
    text.innerText = "Your " + inventory.pop() + " broke!";
    currentWeapon--;
  }
}

function isMonsterHit() {
  return Math.random > 0.2 || health < 20;
  // will return true or false, 20% chance of missing or if health minor than 20
}

function getMonsterAttackValue(level) {
  let hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit;
}

function dodge() {
  text.innerText =
    "You dodged the attack from " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  xpText.innerText = xp;
  goldText.innerText = gold;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}
function picTwo() {
  pick(2);
}

function picEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + guess + " Here are the random numbers!\n";

  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }

  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "You guessed it!, win 20 gold";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong!, lose 10 health, bummer!";
    health -= 10;
    healthText.innerText = health;

    if (health <= 0) {
      lose();
    }
  }
}
