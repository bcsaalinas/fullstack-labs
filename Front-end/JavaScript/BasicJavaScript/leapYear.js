function leapYear(year) {
  if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
    return "Leap year.";
  } else {
    return "Not leap year.";
  }
}

yi = leapYear(1998);

console.log(yi); // Expected output: "Leap year"
