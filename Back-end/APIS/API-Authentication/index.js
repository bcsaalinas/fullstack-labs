import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//this variables may not work if youre trying out the project
//thats because the API data gets deleted every certian time, if you want to test it, change the variables to new ones

// to make your variables go to: https://secrets-api.appbrewery.com/ , on the docs it shows what variables you need
//from beto :-p

//change your variables here
const yourUsername = "nsqk";
const yourPassword = "misa";
const yourAPIKey = "d48ec978-f3f1-4885-9bf5-7690a143894e";
const yourBearerToken = "a825d0c0-bef9-454b-8226-11cd95da076d";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.set("view engine", "ejs");

app.get("/noAuth", async (req, res) => {
  //using noAuth
  try {
    const response = await axios.get(API_URL + "random");
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Error ", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //usage of basic Authh
  try {
    const response = await axios.get(API_URL + "all?page=1", {
      auth: {
        username: `${yourUsername}`,
        password: `${yourPassword}`,
      },
    });
    const result = response.data;

    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Error", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //Usage of API Keys

  //searching for secrets with a rate of 5 or greater
  try {
    const target = API_URL + `filter?score=5&apiKey=${yourAPIKey}`;

    const response = await axios.get(target);
    const result = JSON.stringify(response.data);

    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Error " + error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  //usage of a bearer token

  //getting secret with the id of 42
  try {
    const response = await axios.get(API_URL + "secrets/42", {
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("error " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
