const lover1 = prompt("enter your name");
const lover2 = prompt("enter your crush");

let num = Math.floor(Math.random() * 100) + 1;

alert(`${lover1} and ${lover2} are ${num}% compatible`);

if (num === 100) {
  alert(`You and ${lover2} are a perfect match!`);
} else if (num >= 50) {
  alert(`You and ${lover2} are sort likely a match`);
} else {
  alert(`You and ${lover2} are not likely a match`);
}

//note, you cant actually run this in vscode, but you can use snippets on the chrome dev tools to make the snippets and alert work
