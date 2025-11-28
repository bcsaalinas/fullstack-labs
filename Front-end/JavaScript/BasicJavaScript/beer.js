function beer() {
  let i = 99;
  const startingBeers = i;
  while (i >= 0) {
    console.log(i);
    i--;
    if (i === 2) {
      console.log(`${i} bottles of beer on the wall , ${i} bottles of beer.`);
      console.log(
        `Take one down and pass it around, ${i - 1} bottle of beer on the wall`
      );
    } else if (i === 1) {
      console.log(`${i} bottle of beer on the wall , ${i} bottle of beer.`);
      console.log(
        "Take one down and pass it around, no more bottles on the wall "
      );
    } else if (i === 0) {
      console.log(
        "No more bottles of beer on the wall, no more bottles of beer"
      );
      console.log(
        `Go to the store and buy some more,${startingBeers} bottles on the wall`
      );
      break;
    } else {
      console.log(`${i} bottles of beer on the wall , ${i} bottles of beer.`);
      console.log(
        `Take one down and pass it around, ${i - 1} bottles of beer on the wall`
      );
    }
  }
}

beer();
