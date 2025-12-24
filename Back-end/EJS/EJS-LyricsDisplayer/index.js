import express from "express";
import ejs from "ejs";

const app = express();
const port = 3000;

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const lyricsByDay = {
  0: "Then the storm came in to save my life — STARGAZING",
  1: "This the time of the year I feel alone — Impossible",
  2: 'My granny called, she said "Travie, you work too hard" — 90210',
  3: "Too many doors closed, cul-de-sacs and fork roads — COFFEE BEAN",
  4: "Clearly I been thinkin' 'bout dis side — Oh My Dis Side",
  5: "Fuck the money, never leave your people behind — STOP TRYING TO BE GOD",
  6: "I've been down and lost for days — Drugs You Should Try It",
};

app.get("/", (req, res) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const advice = lyricsByDay[dayOfWeek];
  const dayName = daysOfTheWeek[dayOfWeek];

  res.render("index.ejs", {
    dayName,
    advice,
  });
});

app.listen(port, () => {
  console.log("listening on port" + port);
});
