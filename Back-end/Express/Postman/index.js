import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("server running on port " + port);
});

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to my page!</h1> <p>This is a test for using Postman</p>"
  );
});

app.post("/register", (req, res) => {
  //save data
  res.sendStatus(201);
});

app.put("/user/beto", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/beto", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/beto", (req, res) => {
  res.sendStatus(200);
});
