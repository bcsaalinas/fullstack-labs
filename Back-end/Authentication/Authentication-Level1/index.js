import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  database: "secrets",
  password: "matthardy999",
  port: 5432,
});

db.connect().catch((error) => {
  console.error("Database connection failed:", error);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkDuplicate = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (checkDuplicate.rows.length > 0) {
      res.send("Error, account already registered");
    } else {
      await db.query("INSERT INTO users (email,password) VALUES ($1 , $2)", [
        email,
        password,
      ]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkRegistered = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (checkRegistered.rows.length !== 0) {
      const targetPassword = checkRegistered.rows[0].password;
      console.log("Target password: ", targetPassword);

      if (targetPassword === password) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect password, try again");
      }
    } else {
      res.send("no account registered with that email, try again");
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
