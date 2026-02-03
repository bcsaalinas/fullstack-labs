import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "matthardy999",
  database: "world",
  port: 5432,
});

db.connect();

//simple function to capitalize inputs for better validation
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//async function to get all countries from database
async function getCountries() {
  let countries = [];
  const res = await db.query("select country_code from visited_countries");

  const rows = res.rows;

  //push each country code to the countries array
  rows.forEach((row) => countries.push(row.country_code));

  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const countries = await getCountries();
  console.log(countries);
  const total = countries.length;
  res.render("index.ejs", { countries: countries, total: total });
});

app.post("/add", async (req, res) => {
  let countryName = req.body.country;
  countryName = capitalizeFirstLetter(countryName);

  try {
    const response = await db.query(
      "SELECT country_code FROM countries WHERE (country_name) LIKE '%' || $1 || '%';",
      [countryName],
    );

    let rows = response.rows;

    const code = rows[0].country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries(country_code) VALUES ($1)",
        [code],
      );
    } catch (error) {
      console.log(error);
      const countries = await getCountries();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try some other country",
      });
    }

    res.redirect("/");
  } catch (error) {
    console.log(error);
    const countries = await getCountries();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country not found, try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
