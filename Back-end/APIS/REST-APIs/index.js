import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//this bearer token may not work if u try to test it, make a new one doing:
//1- Register: https://secrets-api.appbrewery.com/register
//2- Create your token and replace it in yourBearerToken (u need a username and password in the form ): https://secrets-api.appbrewery.com/get-auth-token

//more info follow the link thats in the variable API_URL
const yourBearerToken = "3e8ef250-9ee8-43ff-9550-a3de2a317753";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

//post method with axios
app.post("/post-secret", async (req, res) => {
  try {
    const secret = req.body.secret;
    const score = req.body.score;

    const response = await axios.post(
      API_URL + "/secrets",
      {
        secret: secret,
        score: score,
      },
      config
    );

    const result = JSON.stringify(response.data);

    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("error ", error.message);
    res.render("index.ejs", { error: JSON.stringify(error.response.data) });
  }
});

//put method with axios
app.post("/put-secret", async (req, res) => {
  try {
    const searchId = req.body.id;

    const response = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    const result = JSON.stringify(response.data);

    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("error " + error.message);
    res.render("index.ejs", { error: JSON.stringify(error.response.data) });
  }
});

//patch method with axios
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;

  try {
    const response = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("error ", error.message);
    res.render("index.ejs", { error: JSON.stringify(error.response.data) });
  }
});

//delete method with axios
app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const response = await axios.delete(
      API_URL + "/secrets/" + searchId,
      config
    );
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("error ", error.message);
    res.render("index.ejs", { error: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
