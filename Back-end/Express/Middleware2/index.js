import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { log } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

function computeSum(req, res, next) {
  if (req.method === "POST" && req.path === "/add") {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);

    if (Number.isNaN(num1) || Number.isNaN(num2)) {
      return res.status(400).send("return valid numbers");
    }
    req.sum = num1 + num2;
  }
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(computeSum);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log("running in port" + port);
});

app.post("/add", (req, res) => {
  res.send(`Result is ${req.sum}`);
});
