import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "matthardy999",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "beto", color: "red" },
  { id: 2, name: "Alvarito", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query(
    "SELECT visited_countries.country_code, countries.country_name FROM visited_countries JOIN countries ON visited_countries.country_code = countries.country_code WHERE user_id = $1 ORDER BY countries.country_name",
    [currentUserId],
  );
  return result.rows;
}

async function getCurrentUsers() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id === Number(currentUserId));
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUsers();
  console.log(currentUser);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()],
    );

    const data = result.rows[0];
    console.log("data: ", data);

    const countryCode = data.country_code;
    console.log(countryCode);

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId],
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
app.post("/delete-user", async (req, res) => {
  const id = req.body.id;
  try {
    await db.query("DELETE FROM visited_countries WHERE user_id = $1", [id]);
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    const remaining = await db.query("SELECT id FROM users ORDER BY id LIMIT 1");
    if (remaining.rows.length > 0) {
      currentUserId = remaining.rows[0].id;
    }
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

app.post("/remove", async (req, res) => {
  const code = req.body.code;
  try {
    await db.query(
      "DELETE FROM visited_countries WHERE country_code = $1 AND user_id = $2",
      [code, currentUserId],
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  const response = await db.query(
    "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id;",
    [name, color],
  );
  console.log(response.rows);

  const id = response.rows[0].id;
  currentUserId = id;

  res.redirect("/");

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
