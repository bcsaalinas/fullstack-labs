function fibonacciGenerator(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    let sum = arr[i - 1] + arr[i - 2];
    arr.push(sum);
  }
  return arr;
}

console.log(fibonacciGenerator(3));

//wouldve done it w recursion but recursion is like smoking weed, you like it, but u dont know wtf is going on
