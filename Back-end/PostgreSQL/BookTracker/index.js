import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import ejs from "ejs";

const port = 3000;
const app = express();

//database dummy
const temp = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { books: temp });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

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
app.post("/add", (req, res) => {
  const { author, title, genre, rating, date_finished, notes, coverId } =
    req.body;

  temp.push({
    author,
    title,
    genre,
    rating: parseInt(rating),
    dateFinished: date_finished,
    notes,
    coverId: coverId || null,
  });

  res.redirect("/");
});

//  render editor for a specific book by index
app.get("/edit", (req, res) => {
  const id = parseInt(req.query.id);
  const book = temp.find((_, i) => i === id);
  if (!book) return res.redirect("/");
  res.render("edit.ejs", { book: { ...book, id } });
});

// save updated book data
app.post("/edit", (req, res) => {
  const id = parseInt(req.body.id);
  if (temp[id]) {
    temp[id] = {
      ...temp[id],
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      rating: parseInt(req.body.rating),
      dateFinished: req.body.date_finished,
      notes: req.body.notes,
    };
  }
  res.redirect("/");
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
        coverId: doc.cover_i,
        coverUrl: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
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
