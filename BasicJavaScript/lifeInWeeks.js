function lifeInWeeks(age) {
  //asuming we only live till 90 years
  // there are 365 days |  52 weeks | 12 months in a whole year
  const lifetime = 90;
  const fullMonths = lifetime * 12;
  const fullWeeks = lifetime * 52;
  const fullDays = lifetime * 365;

  //from input
  let years = age;
  let months = age * 12;
  let weeks = age * 52;
  let days = age * 365;

  console.log(
    `You have ${fullDays - days} days, ${fullWeeks - weeks} weeks, and ${
      fullMonths - months
    } months left.`
  );
}

lifeInWeeks(28);
