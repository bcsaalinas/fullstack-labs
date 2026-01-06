import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const result = response.data;
    console.log("RESULT ", result);

    res.render("index.ejs", { joke: result });
  } catch (error) {
    console.error("ERROR ", error.message);
    res.render("index.ejs", {
      error: "There was an error, try again",
    });
  }
});

app.listen(port, () => {
  console.log("running on port ", port);
});
