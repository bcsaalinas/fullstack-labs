import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("layout/layout.ejs", { posts: posts });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

app.get("/create", (req, res) => {
  res.render("layout/create.ejs");
});

//PENDINFG:
// Style create ejs template
// Implement the logic to add, view and delete posts
