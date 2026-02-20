import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  database: "ToDoList",
  password: "matthardy999",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  //get all items from the database and return them
  const result = await db.query("SELECT * FROM items");

  const items = result.rows;
  res.render("index.ejs", {
    listItems: items,
    listTitle: "Today",
  });
});

//insert items to table
app.post("/add", async (req, res) => {
  const newItem = req.body.newItem;
  console.log(newItem);

  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [newItem]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

//edit added items with update query
app.post("/edit", async (req, res) => {
  const newTitle = req.body.updatedItemTitle;
  const itemId = req.body.updatedItemId;
  console.log(newTitle, itemId);

  await db.query("UPDATE items SET title = $1 WHERE id = $2;", [
    newTitle,
    itemId,
  ]);

  res.redirect("/");
});

//delete items from database
app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;
  console.log(itemId);

  await db.query("DELETE FROM items WHERE id = $1", [itemId]);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
