function getTequila(money, bottles) {
  let bottlePrice = 100;
  console.log("Waking up");
  console.log("Going to store");

  let maxBottles = calcBottles(money, 100);

  if (bottles > maxBottles) {
    console.log(
      "You dont have money for " +
        bottles +
        " bottles! You can only buy " +
        maxBottles +
        " bottles"
    );
  } else {
    let totalCost = bottles * bottlePrice;
    let change = money - totalCost;
    console.log(
      "You bought " + bottles + " bottles, your change is $" + change
    );
  }
}

function calcBottles(startingMoney, bottlePrice) {
  let numberOfBottles = Math.floor(startingMoney / bottlePrice);
  return numberOfBottles;
}
getTequila(250, 2);
