import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/api/notes", notesRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log("running on port http://localhost:", process.env.PORT);
});
