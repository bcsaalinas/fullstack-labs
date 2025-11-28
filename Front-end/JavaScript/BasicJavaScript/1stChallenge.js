// function will recieve an array of numbers of people and will print whos going to pay based on a random number

function whosPaying(names) {
  if (!Array.isArray(names) || names.length === 0) {
    console.log("enter some peoples names as an array");
  }
  const length = names.length;
  const random = Math.floor(Math.random() * length);
  let res = `${names[random]} is going to buy lunch today!`;
  return res;
}
