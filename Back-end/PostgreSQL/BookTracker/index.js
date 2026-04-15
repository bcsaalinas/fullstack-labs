import "dotenv/config";
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

const port = process.env.PORT || 3000;
const app = express();
app.set("trust proxy", 1);

// db setup
const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  database: process.env.DB_NAME || "BookTracker",
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

// session store in postgres
const PgSession = connectPgSimple(session);

app.use(
  session({
    store: new PgSession({ pool, tableName: "session" }),
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

// google oauth
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // create user if needed, else update
        const result = await pool.query(
          `INSERT INTO users (google_id, display_name, email, photo)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (google_id)
           DO UPDATE SET display_name = $2, email = $3, photo = $4
           RETURNING *`,
          [
            profile.id,
            profile.displayName,
            profile.emails?.[0]?.value || null,
            profile.photos?.[0]?.value || null,
          ],
        );
        done(null, result.rows[0]);
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, result.rows[0] || null);
  } catch (err) {
    done(err);
  }
});

// app middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// let templates access req.user
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// auth routes
app.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/");
  res.render("login.ejs", { error: null });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (_req, res) => res.redirect("/"),
);

app.get("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

// app routes (auth required)

// home page with this user's books
app.get("/", ensureAuth, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM book WHERE user_id = $1 ORDER BY created_at DESC",
    [req.user.id],
  );
  res.render("index.ejs", { books: result.rows });
});

// step 1: search book covers
app.post("/search-covers", ensureAuth, async (req, res) => {
  const { author, title, genre, rating, date_finished, notes } = req.body;
  const coverOptions = await getBookCoverOptions(title);

  // also load books so the grid still renders
  const booksResult = await pool.query(
    "SELECT * FROM book WHERE user_id = $1 ORDER BY created_at DESC",
    [req.user.id],
  );

  res.render("index.ejs", {
    books: booksResult.rows,
    openPicker: true,
    coverOptions,
    formData: { author, title, genre, rating, date_finished, notes },
  });
});

// save new book
app.post("/add", ensureAuth, async (req, res) => {
  const { author, title, genre, rating, date_finished, notes, coverId } =
    req.body;

  await pool.query(
    "INSERT INTO book (user_id, author, title, genre, rating, date_finished, notes, bookcoverid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      req.user.id,
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

// open edit page
app.get("/edit", ensureAuth, async (req, res) => {
  const id = parseInt(req.query.id);
  const result = await pool.query(
    "SELECT * FROM book WHERE id = $1 AND user_id = $2",
    [id, req.user.id],
  );
  const book = result.rows[0];
  if (!book) return res.redirect("/");
  res.render("edit.ejs", { book });
});

// save edits
app.post("/edit", ensureAuth, async (req, res) => {
  const { id, title, author, genre, rating, date_finished, notes } = req.body;

  try {
    await pool.query(
      "UPDATE book SET title = $1, author = $2, genre = $3, rating = $4, date_finished = $5, notes = $6 WHERE id = $7 AND user_id = $8",
      [
        title,
        author,
        genre,
        parseInt(rating),
        date_finished || null,
        notes,
        parseInt(id),
        req.user.id,
      ],
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Error updating book");
  }
});

// delete book
app.post("/delete", ensureAuth, async (req, res) => {
  const id = parseInt(req.body.id);
  try {
    await pool.query("DELETE FROM book WHERE id = $1 AND user_id = $2", [
      id,
      req.user.id,
    ]);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Error deleting book");
  }
});

// helper bits

async function getBookCoverOptions(title) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=10`,
    );
    const data = await response.json();
    if (!data.docs) return [];

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

// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
