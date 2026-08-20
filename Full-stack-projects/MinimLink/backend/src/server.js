import express from "express";
import pg from "./config/db.js"

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/", async (req, res) => {
  try {

    const data = {
      short_code : "uno", 
      long_url : "Another cool thing i inserted", 
      click_count : 0, 
      created_at : new Date().toLocaleString(),
    }


    await pg("links").insert(data)

    res.send(data)

  } catch (error) {

    console.log("Error connecting to db", error)
    res.send("No")
    
  }
});
