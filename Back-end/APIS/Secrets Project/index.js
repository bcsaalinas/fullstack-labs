import express from "express";
import axios from "axios";

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

const port = 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    const result = response.data;
    console.log(result);

    console.log("info : ", result.username, result.secret);
    res.render("index.ejs", { secret: result.secret, user: result.username });
  } catch (error) {
    console.error("error ", error.message);
    res.render("index.ejs", { error: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log("running on port", port);
});
