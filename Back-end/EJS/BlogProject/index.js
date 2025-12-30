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

app.post("/submit", (req, res) => {
  //format time to render on page
  const date = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const post = {
    author: req.body.author,
    title: req.body.title,
    text: req.body.content,
    date: date,
    id: Date.now(),
  };

  posts.push(post); //  store new post
  res.redirect("/"); // update the og page with new post
});

app.get("delete/:id", (req, res) => {
  const postId = req.params.id;
  const post = post.finc((p) => p.id == postId);

  if (!post) {
    return res.status(400).send("Post not found :(");
  }

  posts.pop(post);
  res.render("layout/layout.ejs", { posts: posts });
});
app.get("/delete/:id", (req, res) => {
  const postId = req.params.id;
  const postIndex = posts.findIndex((p) => p.id == postId);

  if (postIndex === -1) {
    return res.status(400).send("Post not found :(");
  }

  posts.splice(postIndex, 1); // Remove the post from the array
  res.redirect("/"); // Redirect to the homepage to see the updated list
});

app.get("/post/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id == postId);

  if (!post) {
    return res.status(400).send("Post not found :(");
  }

  res.render("layout/post.ejs", { post: post });
});
