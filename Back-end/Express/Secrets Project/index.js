//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const key = "ILoveProgramming";

function checkAnswer(req, res, next) {
  if (req.method === "POST" && req.path === "/check") {
    const userInput = req.body.password;
    console.log(userInput);

    if (userInput === key) {
      req.answer = true;
    } else {
      req.answer = false;
    }
  }
  next();
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkAnswer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (req.answer === true) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
