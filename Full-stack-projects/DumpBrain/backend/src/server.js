import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Built-in Express middleware to parse JSON and URL-encoded bodies
app.use(express.json()); // to support json encoded-bodies

// to support url-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/api/", notesRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`running on port http://localhost:${process.env.PORT}`);
});
