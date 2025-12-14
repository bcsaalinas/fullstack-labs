import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("Running on " + port);
});

app.get("/", (req, res) => {
  res.send("hey");
});
