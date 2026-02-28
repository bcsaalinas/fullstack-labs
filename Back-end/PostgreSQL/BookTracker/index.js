import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import ejs from "ejs";

const port = 3000;
const app = express();

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  database: "BookTracker",
  password: "matthardy999",
  port: "5432",
});

let temp = [];

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM book");

  const rows = result.rows;
  console.log(rows[0]);

  res.render("index.ejs", { books: rows });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//process for displaying book covers

// 1-search for cover options and show the picker
app.post("/search-covers", async (req, res) => {
  const { author, title, genre, rating, date_finished, notes } = req.body;
  const coverOptions = await getBookCoverOptions(title);

  res.render("index.ejs", {
    books: temp,
    openPicker: true, // tells EJS to open the modal on load
    coverOptions, // array of { coverId, coverUrl, bookTitle }
    formData: { author, title, genre, rating, date_finished, notes },
  });
});

// 2—save the book with the chosen cover
app.post("/add", async (req, res) => {
  const { author, title, genre, rating, date_finished, notes, coverId } =
    req.body;

  await db.query(
    "INSERT INTO book (author, title, genre, rating , date_finished, notes, bookcoverid) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      author,
      title,
      genre,
      parseInt(rating),
      date_finished || null,
      notes,
      coverId || null,
    ],
  );

  res.redirect("/");
});

//  render editor for a specific book by index
app.get("/edit", async (req, res) => {
  const id = parseInt(req.query.id);
  const result = await db.query("SELECT * FROM book WHERE id = $1", [id]);
  const book = result.rows[0];
  if (!book) return res.redirect("/");
  console.log("Book data:", book);
  res.render("edit.ejs", { book: book });
});

// delete a book
app.post("/delete", async (req, res) => {
  const id = parseInt(req.body.id);
  try {
    await db.query("DELETE FROM book WHERE id = $1", [id]);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Error deleting book");
  }
});

// save updated book data
app.post("/edit", async (req, res) => {
  const { id, title, author, genre, rating, date_finished, notes } = req.body;

  try {
    await db.query(
      "UPDATE book SET title = $1, author = $2, genre = $3, rating = $4, date_finished = $5, notes = $6 WHERE id = $7",
      [
        title,
        author,
        genre,
        parseInt(rating),
        date_finished || null,
        notes,
        parseInt(id),
      ],
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error updating notes:", error);
    res.status(500).send("Error updating book");
  }
});

//  return up to 6 cover options for a title
async function getBookCoverOptions(title) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=10`,
    );
    const data = await response.json();
    if (!data.docs) return [];

    // filter to entries that actually have a cover, deduplicate by cover_i
    const seen = new Set();
    const options = [];
    for (const doc of data.docs) {
      if (!doc.cover_i || seen.has(doc.cover_i)) continue;
      seen.add(doc.cover_i);
      options.push({
        coverid: doc.cover_i,
        coverUrl: `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
        bookTitle: doc.title,
        author: doc.author_name ? doc.author_name[0] : "",
      });
      if (options.length === 6) break;
    }
    return options;
  } catch {
    return [];
  }
}
